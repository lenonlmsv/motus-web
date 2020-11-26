import React, { useState, useContext } from "react";

//Router
import { Link, useHistory } from "react-router-dom";

//Auth
import { Context as AuthContext } from "../context/authContext";

//Components
import BackgroundTitle from "../components/background-title/Background-title";
<<<<<<< HEAD
import api from '../services/api'
import { login, isAuthenticated, TOKEN_KEY } from "../services/auth";
=======
import api from "../services/api";
import { login, isAuthenticated } from "../services/auth";
>>>>>>> 1f6cc167626ea4115b505f05453bfaa691ae5c03

//CSS
import "../styles/login.css";

function initialState() {
	return { user: "", password: "" };
}

const Login = () => {
	const history = useHistory();

	isAuthenticated() && history.push("/oportunidades");

	const { state, signin } = useContext(AuthContext);
	const [user, setUser] = useState(initialState.user);
	const [password, setPassword] = useState(initialState.password);
	const [display, setDisplay] = useState("display-none");

	async function onSubmit(e) {
		e.preventDefault();
<<<<<<< HEAD

		const data = {
			"login": user, 
			"password": password
		};

		try {
			//api.defaults.headers.post['Content-Type'] = 'application/json'; //USAR FORMATO JSON

			const json = JSON.stringify(data);
			
			await api.post('/api/service/login', json).then( response => {
				const string = response.data.split(' ');
				const token = string[1]; //Get token

				const userData = api.get(`/candidato/`)

				login(token); //Store token
				
				alert("Logado")
				history.push('/oportunidades');
			})
			}

		catch (error) {
			console.log(error);
			setDisplay('')
=======
		//return () => signin({ email: values.user, password: values.password });
		//signin({ email: values.user, password: values.password });

		const data = new FormData();

		data.append("login", user);
		data.append("senha", password);

		for (var pair of data.entries()) {
			console.log(pair);
		}

		try {
			//api.post('api/service/cadastro', data);
			//login(response.data.token)
			history.push("/oportunidades");
		} catch (error) {
			console.log(error.message);
			setDisplay("");
>>>>>>> 1f6cc167626ea4115b505f05453bfaa691ae5c03
		}
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

					<div id="submit-error" className={display}>
						<p className={display}>
							Erro ao realizar login. Tente novamente!
						</p>
					</div>

					<div id="options">
						<Link to="/candidato/cadastro">Cadastre-se</Link>

						<Link to="/">Esqueci minha senha</Link>
					</div>

					<div className="submit-button">
						<Link to="/" className="button button-secondary">
							Ver oportunidades
						</Link>

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
