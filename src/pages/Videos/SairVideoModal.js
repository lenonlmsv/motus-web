import React, { useState } from "react";
import ReactModal from "react-modal";

import { Link, useHistory } from "react-router-dom";

import { GrFormClose } from "react-icons/gr";

import "./Styles/SairVideoModal.css";
//ReactModal.setAppElement("#root");
const SairVideoModal = ({ functionClose, functionCloseAndLeave, isOpen }) => {
	//const [isOpen, setIsOpen] = useState(true);
	const history = useHistory();

	const closeModal = () => {
		//setIsOpen(false);
		functionClose(false);
		//console.log("modal close clicado");
		//history.push("/oportunidades");
	};

	const closeAndLeave = () => {
		functionCloseAndLeave();
	};

	return (
		<div>
			<ReactModal
				isOpen={isOpen}
				closeTimeoutMS={1000}
				onRequestClose={() => closeModal()}
				style={{
					overlay: {
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(0, 0, 0, 0.75)",
					},
					content: {
						borderRadius: 35,
						padding: "40px",
						maxWidth: 550,
						marginLeft: "50%",
						left: -275,
						height: 400,
						marginTop: -195,
						top: "50%",
						width: "100%",
					},
				}}
			>
				<p onClick={() => closeModal()} className="button-close">
					<GrFormClose className="button-close-icon" />
				</p>
				<div>
					<div>
						<p>
							Ao clicar em voltar, você estará cancelando a
							gravação do seu vídeo. Deseja realmente fazer isso?
						</p>
					</div>
					<div>
						<button onClick={() => closeAndLeave()}>Sim</button>
						<button onClick={() => closeModal()}>Não</button>
					</div>
				</div>
			</ReactModal>
		</div>
	);
};

export default SairVideoModal;
