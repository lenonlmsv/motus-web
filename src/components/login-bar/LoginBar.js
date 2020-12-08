import React, {useState} from "react";

//Router dom
import { Link } from "react-router-dom";

//Contex
import { connect } from "react-redux";

//CSS
import "./styles/login-bar.css";

//Components
import { getHashId, getUserName } from "../../services/auth";

function logoutREDUX() {
	return {
		type: "LOGOUT",
	};
}

function LoginBar({ isLogged, dispatch }) {
	const hashId = getHashId();

	if (isLogged) {
		return (
			<div id="login-bar">
				<div className="div-limited display-flex">
					<p className="hide-long-content">{`Candidato(a) ${getUserName()}`}</p>
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
			<div id='login-button'>
				<Link to="/login" className="">
					Acessar sistema
				</Link>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { isLogged: state.IsLogged };
};

export default connect(mapStateToProps)(LoginBar);
