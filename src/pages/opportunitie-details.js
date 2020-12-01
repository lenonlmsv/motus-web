import React, { createContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

//Components
import BackgroundTitle from "../components/background-title/Background-title";
import OpportunitiesDetailCard from "../components/opportunities/OpportunitiesDetailCard";
import api from "../services/api";

//CSS
import "../styles/opportunitie-details.css";

//Icons
import { FaUpload, FaDownload, FaRecordVinyl, FaCheck } from "react-icons/fa";

export const userCandidature = createContext();

function OpportunitieDetail() {
	//States
	const params = useParams();

	const [opportunity, setOpportunity] = useState([]);
	const [checkCandidate, setCheckCandidate] = useState(false);
	const [candidature, setCandidature] = useState([]);
	const [isVideo, setIsVideo] = useState();

	//Context
	useEffect(() => {
		const fetchOpportunity = async () => {
			//setLoading(true);
			try {
				const response = await api.get(`/oportunidade/${params.id}`);
				setOpportunity(response.data.responseData);
				//setLoading(false);
			} catch (e) {
				console.log(e);
			}
		};

		//Checar se o usuário tem a candidatura
		fetchOpportunity();
		setCheckCandidate();
	}, []);

	const createNewCandidature = () => {
		//Criar candidatura na base

		setCheckCandidate(true);
	};

	console.log(params.id);
	console.log(opportunity);

	return (
		<div id="page-opportunitie-details" className="page-position">
<<<<<<< HEAD
			<BackgroundTitle 
				title={`${opportunity.titulo}`}
				description="" />
=======
			<BackgroundTitle title={opportunity.titulo} description="" />
>>>>>>> 9ebfe33316c7f554b75d9e959432d8aed6297f07

			<div className="opportunitie-detail-description">
				{
					//<strong>Número de vagas:</strong>
					//<p id="opportunitie-name">199</p>
				}
				<OpportunitiesDetailCard
					jobDescription={opportunity.descricaoVaga}
					jobType={"Senior"}
					workTime={opportunity.horarioTrabalho}
					habilities={opportunity.requisitoDesejavel}
				/>

				<button
					onClick={createNewCandidature}
					className="button button-secondary opportunitie-button"
				>
					Quero me candidatar
				</button>
			</div>

			<div id="record-videos">
				<p>
					Olá, <strong>usuário</strong>. Você está se candidatando a
					vaga de Desenvolvedor React. Já temos seu CV e vídeo CV.
					Precisamos que você responda as perguntas abaixo.
				</p>

				<p>Por favor, responda as questões abaixo em vídeo:</p>
			</div>

			<div id="video-questions">
				{
					//Lista de perguntas para o candidato
				}

				<div className="questions">
					<div className="question">
						Fale um pouco sobre você{" "}
						<FaCheck className="question-check" />
					</div>

					<div className="actions">
						<label htmlFor="send-video" className="send-button">
							<FaUpload className="send-button-icon" />
							Enviar Vídeo
						</label>

						<input
							id="send-video"
							type="file"
							className="send-button"
							style={{ display: "none" }}
						/>

						<Link to={`/gravar-video/:id`} className="send-button">
							{
								//Retornar para video/:id
							}
							<FaRecordVinyl className="send-button-icon" />
							Gravar vídeo
						</Link>

						<button className="send-button">
							<FaDownload className="send-button-icon" />
							Download
						</button>
					</div>
				</div>
			</div>

			<div id="message">
				<p>Parabéns! Você está concorrendo a esta vaga!</p>
			</div>

			<div className="return">
				<Link to="/oportunidades/" className="button button-secondary">
					Ver oportunidades
				</Link>
			</div>
		</div>
	);
}

export default OpportunitieDetail;
