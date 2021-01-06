import React, { useState } from "react";
import { Button } from "@material-ui/core";

//Router dom
import { Link } from "react-router-dom";

//Contex
import { connect } from "react-redux";

//CSS
import "./styles/login-bar.css";

//Components
import { getHashId } from "../../services/auth";

import LoginModal from "../login-modal/LoginModal";

function logoutREDUX() {
	return {
		type: "LOGOUT",
	};
}

function LoginBar({ isLogged, userName, dispatch }) {
	const [isLogar, setIsLogar] = useState(false);
	const hashId = getHashId();

	const closeModal = () => {
		setIsLogar(false);
	};

	const openModal = () => {
		setIsLogar(true);

		//setIsLogar(false);
	};

	if (isLogged) {
		return (
			<div id="login-bar">
				<div className="div-limited display-flex">
					<p className="hide-long-content">{`Candidato(a) ${userName},`}</p>
				</div>

				<div className="logout-options">
					<Link to={`/candidato/${hashId}`}>{"Meus dados |"}</Link>

					<Link
						onClick={() => {
							dispatch(logoutREDUX());
						}}
						className="logout-button"
					>
						{"Logout"}
					</Link>
				</div>
			</div>
		);
	} else {
		return (
			<div id="login-button">
				<Button to="" className="" onClick={() => openModal()}>
					{"Login | "}
				</Button>

				<Link to="/cadastro" className="">
					{" Cadastre-se"}
				</Link>
				{isLogar ? <LoginModal functionClose={closeModal} /> : null}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLogged: state.IsLogged,
		userName: state.UserName,
	};
};

export default connect(mapStateToProps)(LoginBar);
