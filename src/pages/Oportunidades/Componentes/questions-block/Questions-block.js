import React, { useEffect, useState } from "react";

//Router
import { Link, useParams } from "react-router-dom";

//Methods
import {
	getVideoQuestions,
	downloadVideoAnswer,
	checkRecordedQuestions,
} from "../../../../services/methods";

//Alert
import { useAlert } from "react-alert";

//Icons
import { FaDownload, FaRecordVinyl, FaCheck } from "react-icons/fa";

export default function QuestionsBlock() {
	const params = useParams();

	//States
	const [questions, setQuestions] = useState("");
	const [recordedQuestions, setRecordedQuestions] = useState("");
	const [isCompleted, setIsCompleted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fecthRecordedQuestions(id) {
			const response = await checkRecordedQuestions(id);
			if (response === null) {
				showError("Erro ao buscar dados.");
			} else {
				////console.log('valores respondidos', response.data.responseData)
				setRecordedQuestions(response);
				return response;
			}
		}

		async function fecthQuestions() {
			const response = await getVideoQuestions();
			const answers = await fecthRecordedQuestions(params.id);

			if (response === null) {
				showError("Erro ao buscar dados. Tente novamente");
			} else {
				if (answers.length !== 0) {
					const questionsAPI = response.data.responseData.map(
						(item) => {
							return {
								isAnswered: false,
								item,
							};
						}
					);

					questionsAPI.forEach((item) => {
						answers.forEach((questionId) => {
							if (questionId === item.item.id) {
								item.isAnswered = true;
							}
						});
					});

					setQuestions(questionsAPI);
					checkAllAnswers();
				} else {
					let questionsAPI = [];

					response.data.responseData.forEach((item) => {
						questionsAPI.push({
							isAnswered: false,
							item,
						});
					});

					setQuestions(questionsAPI);
				}
			}
		}

		function checkAllAnswers() {
			//Checa se todas as perguntas estão respondidas
			const questionsCheck = Object.keys(questions).map((key) => {
				return questions[key].item.id;
			});

			// const recQuesitons = recordedQuestions.map(recQuestion => {
			//     return recQuesitons
			// })

			questionsCheck === recordedQuestions && setIsCompleted(true);
		}

		fecthQuestions();
	}, params.id);

	////console.log('questions', questions)

	const alert = useAlert();

	function showSucess(m) {
		alert.show(m, { type: "success" });
	}

	function showError(m) {
		alert.show(m, { type: "error" });
	}

	function downloadVideo(questionId) {
		setIsLoading(true);
		//console.log('loading', isLoading)
		const opportunityId = params.id;
		downloadVideoAnswer(opportunityId, questionId);
		setTimeout(() => setIsLoading(false), 2000);
	}

	return (
		<div>
			{Object.keys(questions).map((key) => {
				const idToLink = questions[key].item.id;
				const questionToLink = questions[key].item.descricao;
				const timeToLink =
					questions[key].item.tempoVideo === null
						? "90"
						: questions[key].item.tempoVideo;

				return (
					<div key={questions[key].id} id="video-questions">
						<div className="questions">
							<div className="question">
								{questions[key].item.descricao}{" "}
								{questions[key].isAnswered && (
									<FaCheck className="question-check" />
								)}
							</div>

							<div className="actions">
								<Link
									to={{
										pathname: `/gravar-video/${params.id}`,
										state: {
											idToLink,
											questionToLink,
											timeToLink,
										},
									}}
									className="send-button"
								>
									{
										//Retornar para video/:id
									}
									<FaRecordVinyl className="send-button-icon" />
									Gravar ou enviar vídeo
								</Link>

								{
									//Mostra o botão de download de acordo com as respostas disponíveis
									questions[key].isAnswered && (
										<button
											onClick={() => {
												downloadVideo(
													questions[key].item.id
												);
											}}
											className="send-button"
										>
											<FaDownload className="send-button-icon" />
											Download
										</button>
									)
								}
							</div>
						</div>
					</div>
				);
			})}

			{isCompleted && (
				<div id="message">
					<p>Parabéns! Você está concorrendo a esta vaga!</p>
				</div>
			)}
		</div>
	);
}
