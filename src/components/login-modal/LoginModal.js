import React, { useState } from "react";
import ReactModal from "react-modal";
import Login from "../LoginComponent";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Link, useHistory } from "react-router-dom";

import { GrFormClose } from "react-icons/gr";

import "./styles/modal.css";
ReactModal.setAppElement("#root");
const LoginModal = ({ functionClose }) => {
	const [isOpen, setIsOpen] = useState(true);
	const history = useHistory();

	const closeModal = () => {
		setIsOpen(false);
		functionClose();
		console.log("modal close clicado");
		//history.push("/oportunidades");
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
				<Link onClick={() => closeModal()} className="button-close">
					<GrFormClose className="button-close-icon" />
				</Link>

				<Login closeModal={closeModal} />
			</ReactModal>
		</div>
	);
};

export default LoginModal;
