import React, {useState} from "react";

//Router dom
import { Link } from "react-router-dom";

//Contex
import { connect } from "react-redux";

//CSS
import "./styles/login-bar.css";

//Components
import { getHashId } from "../../services/auth";

function logoutREDUX() {
	return {
		type: "LOGOUT",
	};
}

function LoginBar({ isLogged, userName, dispatch }) {
	const hashId = getHashId();
	
	if (isLogged) {
		return (
			<div id="login-bar">
				<div className="div-limited display-flex">
					<p className="hide-long-content">{`Candidato(a) ${userName}`}</p>
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
					{"Login | "}
				</Link>

				<Link to="/cadastro" className="">
					{' Cadastre-se'}
				</Link>
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
