import React, { createContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

//Components
import BackgroundTitle from "../components/background-title/Background-title";
import OpportunitiesDetailCard from "../components/opportunities/OpportunitiesDetailCard";

//CSS
import "../styles/opportunitie-details.css";

//Icons
import { FaUpload, FaDownload, FaRecordVinyl, FaCheck } from "react-icons/fa";

export const userCandidature = createContext();

function OpportunitieDetail() {
	//Verificar se devemos colocar o candidatura id num useContext

	//States
	const [checkCandidate, setCheckCandidate] = useState(false);
	const [candidature, setCandidature] = useState([]);
	const [isVideo, setIsVideo] = useState();

	//Context

	useEffect(() => {
		//Checar se o usuário tem a candidatura
		setCheckCandidate();
	}, []);

	const createNewCandidature = () => {
		//Criar candidatura na base

		setCheckCandidate(true);
	};

	return (
		<div id="page-opportunitie-details" className="page-position">
			<BackgroundTitle title="Desenvolvedor React" description="" />

			<div className="opportunitie-detail-description">
				{
					//<strong>Número de vagas:</strong>
					//<p id="opportunitie-name">199</p>
				}
				<OpportunitiesDetailCard />

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
