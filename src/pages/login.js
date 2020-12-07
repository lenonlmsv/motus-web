import React, { useState, useContext, useEffect } from "react";

//Router
import { Link, useHistory } from "react-router-dom";

//Redux connect
import { connect } from "react-redux";

import { signIn } from "../actions";

//Auth
import { login, isAuthenticated } from "../services/auth";

//Components
import BackgroundTitle from "../components/background-title/Background-title";
import api from "../services/api";

//CSS
import "../styles/login.css";

//Alert
import { useAlert } from "react-alert";

function initialState() {
	return { user: "", password: "" };
}

function loginREDUX() {
	return {
		type: "LOGIN",
	};
}

function Login({ dispatch, isLogged, signIn }) {
	const alert = useAlert();

	const showError = (message) => {
		alert.show(message, { type: "error" });
	};

	const history = useHistory();

	isAuthenticated() && history.push("/oportunidades");

	//const { state, signin } = useContext(AuthContext);
	const [user, setUser] = useState(initialState.user);
	const [password, setPassword] = useState(initialState.password);
	//const [display, setDisplay] = useState("display-none");

	useEffect(() => {
		if (isLogged) {
			history.push("/oportunidades");
		}
	}, [isLogged]);

	async function onSubmit(e) {
		e.preventDefault();

		signIn(user, password);

		/*const dataObj = {
			login: user,
			password: password,
		};

		const data = JSON.stringify(dataObj);

		try {
			api.defaults.headers.post['Content-Type'] = 'application/json'; //USAR FORMATO JSON

			//const json = JSON.stringify(data);

			await api.post("/api/service/login", data).then((response) => {
				const string = response.data.split(" ");
				const token = string[1]; //Get token
				login(token); //Store token
				dispatch(loginREDUX())
				history.push("/oportunidades");
			});


		} catch (error) {
			console.log(error.message)
			switch (error.message) {
				case ('Request failed with status code 403'): showError('Usuário não encontrado');
				default: showError('Erro inesperado ao realizar login')
			}
			//showError(error.message)//"Erro ao executar login. Tente novamente.")
		}*/
	}

	return (
		<div id="page-login" className="page-position">
			<BackgroundTitle title="Login" description="" />

			<main>
				<form onSubmit={onSubmit}>
					<div className="input-block">
						<label htmlFor="user">
							Login
							<span>Informe o e-mail para login</span>
						</label>
						<input
							id="user"
							name="user"
							value={user}
							type="text"
							maxLength="50"
							onChange={(event) => {
								setUser(event.target.value);
							}}
							required
						/>
					</div>

					<div className="input-block">
						<label htmlFor="password">Senha</label>

						<input
							id="password"
							name="password"
							value={password}
							type="password"
							maxLength="10"
							onChange={(event) => {
								setPassword(event.target.value);
							}}
							required
						/>
					</div>

					{/* <div id="submit-error" className={display}>
						<p className={display}>
							Erro ao realizar login. Tente novamente!
						</p>
					</div> */}

					<div id="options">
						<Link to="/cadastro">Cadastre-se</Link>

						<Link to="/">Esqueci minha senha</Link>
					</div>

					<div className="submit-button">
						<Link to="/" className="button button-secondary">
							Ver oportunidades
						</Link>

						<button type="submit" className="button button-primary">
							Acessar
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}

const mapStateToProps = (state) => {
	return { isLogged: state.IsLogged };
};

export default connect(mapStateToProps, { signIn })(Login);
