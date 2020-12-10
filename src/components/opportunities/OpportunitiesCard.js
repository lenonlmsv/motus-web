import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import OpportunitiesDetailCard from "./OpportunitiesDetailCard";

import { getCandidaturasRedux } from "../../store/actions";

//CSS
import "../../styles/opportunities.css";

//Icons
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { connect } from "react-redux";

const OpportunitiesCard = ({
	jobId,
	jobName,
	jobDescription,
	jobType,
	workTime,
	habilities,
	getCandidaturasRedux,
	IsCandidato,
}) => {
	//States;
	const [card, setCard] = useState("opportunities-card-closed");
	const [description, setDescription] = useState(
		"opportunitie-description-closed"
	);
	const ArrowDown = <AiOutlineDown style={{ color: "rgba(0,0,0,0.5)" }} />;
	const ArrowUp = <AiOutlineUp style={{ color: "rgba(0,0,0,0.5)" }} />;
	const [iconState, setIconState] = useState(ArrowDown);

	//History
	const history = useHistory();

	useEffect(() => {
		getCandidaturasRedux();
	}, []);

	const openCard = () => {
		setCard("");
		setDescription("");
		setIconState(ArrowUp);
	};

	const closeCard = () => {
		setCard("opportunities-card-closed");
		setDescription("opportunitie-description-closed");
		setIconState(ArrowDown);
	};

	const triggerCard = (event) => {
		card !== "opportunities-card-closed" ? closeCard() : openCard();
	};

	const checkUservideo = () => {
		//Checar se o usuário tem vídeo currículo cadastrado
		const isVideoRecored = true;

		isVideoRecored
			? history.push(`/oportunidades/${jobId}`)
			: history.push("/video-curriculo");
	};

	return (
		<div className="opportunities">
			<div // Oportunity begin
				onClick={triggerCard}
				className={`opportunities-card ${card}`}
			>
				{jobName ? <h3>{jobName}</h3> : <h3>Desenvolvedor React</h3>}
				<i>{iconState}</i>
			</div>

			<div className={`opportunitie-description ${description}`}>
				{
					//</div>strong>Número de vagas:</strong>
					//<p id="opportunitie-name">199</p>
				}

				<OpportunitiesDetailCard
					jobDescription={jobDescription}
					jobType={jobType}
					workTime={workTime}
					habilities={habilities}
				/>

				{
					//Verificar se o usuário possui o vídeo currículo gravado e direcionar:
					//para a tela de gravação se não tiver (video-resume)
					//para a tela com opções de vídeos, se tiver (oppotunitie-details)
				}

				<button
					onClick={checkUservideo}
					className="button button-secondary opportunitie-button"
				>
					Candidate-se
				</button>
				{console.log(IsCandidato)}
				{IsCandidato ? (
					<div>Você já está concorrendo a esta vaga!!!</div>
				) : null}
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	//console.log(state);
	return {
		IsCandidato: state.candidatura.find(
			(candidato) => candidato.vagaId === ownProps.jobId
		),
	};
};

export default connect(mapStateToProps, { getCandidaturasRedux })(
	OpportunitiesCard
);
