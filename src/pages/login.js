import React, { useState, useContext } from "react";

//Router
import { Link } from "react-router-dom";

//Auth
import { Context as AuthContext } from "../context/authContext";

//Components
import BackgroundTitle from "../components/background-title/background-title";
import api from "../services/api";

//CSS
import "../styles/login.css";

function initialState() {
	return { user: "", password: "" };
}

const Login = () => {
	const { state, signin } = useContext(AuthContext);
	const [user, setUser] = useState(initialState.user);
	const [password, setPassword] = useState(initialState.password);

	async function onSubmit(e) {
		e.preventDefault();
		//return () => signin({ email: values.user, password: values.password });
		//signin({ email: values.user, password: values.password });

		const data = new FormData();

		data.append("login", user);
		data.append("senha", password);

		for (var pair of data.entries()) {
			console.log(pair);
		}

		try {
			//api.get('api/service/cadastro');
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<div id="page-login">
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

					<div id="options">
						<Link to="/candidato/cadastro">Cadastre-se</Link>

						<Link to="/">Esqueci minha senha</Link>
					</div>

					<div className="submit-button">
						<button
							type="submit"
							className="button button-primary"
							onSubmit={() =>
								signin({
									email: user,
									password: password,
								})
							}
						>
							Acessar
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default Login;
