import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

//CSS
import "../styles/opportunities.css";

//Icons
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const OpportunitiesCard = () => {
	//States;
	const [card, setCard] = useState("opportunities-card-closed");
	const [description, setDescription] = useState(
		"opportunitie-description-closed"
	);
	const ArrowDown = <AiOutlineDown style={{ color: "rgba(0,0,0,0.5)" }} />;
	const ArrowUp = <AiOutlineUp style={{ color: "rgba(0,0,0,0.5)" }} />;
	const [iconState, setIconState] = useState(ArrowUp);

	//History
	const history = useHistory();

	const openCard = () => {
		setCard("");
		setDescription("");
		setIconState(ArrowDown);
	};

	const closeCard = () => {
		setCard("opportunities-card-closed");
		setDescription("opportunitie-description-closed");
		setIconState(ArrowUp);
	};

	const triggerCard = (event) => {
		card !== "opportunities-card-closed" ? closeCard() : openCard();
	};

	const checkUservideo = () => {
		//Checar se o usuário tem vídeo currículo cadastrado
		const isVideoRecored = true;

		isVideoRecored
			? history.push("/oportunidades/:id")
			: history.push("/video-curriculo");
	};

	return (
		<div className="opportunities">
			<div // Oportunity begin
				onClick={triggerCard}
				className={`opportunities-card ${card}`}
			>
				<h3>Desenvolvedor React</h3>
				<i>{iconState}</i>
			</div>

			<div className={`opportunitie-description ${description}`}>
				{
					//</div>strong>Número de vagas:</strong>
					//<p id="opportunitie-name">199</p>
				}

				<strong>Descrição da vaga:</strong>
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

				<strong>Tipo de vaga:</strong>
				<p>Sênior</p>

				<strong>Horário de trabalho:</strong>
				<p>Das 9 às 19h</p>

				<strong>Qualificações e habilidades:</strong>
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
			</div>
		</div>
	);
};

export default OpportunitiesCard;
