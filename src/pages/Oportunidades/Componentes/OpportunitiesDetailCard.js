import React from "react";

//CSS
import "../Styles/Oportunidades.css";
import "../Styles/OportunidadesComponentes.css";

const OpportunitiesDetailCard = ({
	jobDescription,
	jobType,
	workTime,
	habilities,
	numeroVaga,
}) => {
	return (
		<div className="div-card">
			<strong>Descrição da vaga:</strong>
			{jobDescription ? (
				<p id="p"> {jobDescription}</p>
			) : (
				<p id="p">
					is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's standard dummy
					text ever since the 1500s, when an unknown printer took a
					galley of type and scrambled it to make a type specimen
					book. It has survived not only five centuries, but also the
					leap into electronic typesetting, remaining essentially
					unchanged. It was popularised in the 1960s with the release
					of Letraset sheets containing Lorem Ipsum passages, and more
					recently with desktop publishing software like Aldus
					PageMaker including versions of Lorem Ipsum
				</p>
			)}

			<strong>Tipo de vaga:</strong>
			{jobType ? <p>{jobType}</p> : <p>Sênior</p>}

			<strong>Número de vagas:</strong>
			{numeroVaga ? <p>{numeroVaga}</p> : <p>171</p>}

			<strong>Horário de trabalho:</strong>
			{workTime ? <p>{workTime}</p> : <p>Das 9 às 19h</p>}

			<strong>Qualificações e habilidades:</strong>
			{habilities ? (
				<p>{habilities}</p>
			) : (
				<p>
					is simply dummy text of the printing and typesetting
					industry. Lorem Ipsum has been the industry's standard dummy
					text ever since the 1500s, when an unknown printer took a
					galley of type and scrambled it to make a type specimen
					book. It has survived not only five centuries, but also the
					leap into electronic typesetting, remaining essentially
					unchanged. It was popularised in the 1960s with the release
					of Letraset sheets containing Lorem Ipsum passages, and more
					recently with desktop publishing software like Aldus
					PageMaker including versions of Lorem Ipsum
				</p>
			)}
		</div>
	);
};

export default OpportunitiesDetailCard;
