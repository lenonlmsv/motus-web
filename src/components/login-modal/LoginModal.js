import React, { useState } from "react";
import ReactModal from "react-modal";
import Login from "../LoginComponent";
import { Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { Link, useHistory } from "react-router-dom";

import { GrFormClose } from "react-icons/gr";

import "./styles/modal.css";
ReactModal.setAppElement("#root");
const LoginModal = () => {
	const [isOpen, setIsOpen] = useState(true);
	const history = useHistory();

	const closeModal = () => {
		setIsOpen(false);
		console.log("modal close clicado");
		//history.push("/oportunidades");
	};

	return (
		<div>
			<ReactModal
				isOpen={isOpen}
				closeTimeoutMS={1000}
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
						maxWidth: 600,
						marginLeft: "50%",
						left: -300,
						height: 420,
						marginTop: -210,
						top: "50%",
					},
				}}
			>
				<IconButton
					variant="contained"
					color="primary"
					component="span"
					onClick={() => closeModal()}
					className={"button-close"}
				>
					<GrFormClose className={"button-close-icon"} />
				</IconButton>

				<Login />
			</ReactModal>
		</div>
	);
};

export default LoginModal;
