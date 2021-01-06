import React, { useState, useEffect } from "react";

//Router
import { Link, useHistory } from "react-router-dom";

//Redux connect
import { connect } from "react-redux";
import { signIn as signInAction } from "../store/actions";
import { setName as setNameAction } from "../store/actions/set-user-name";

//Auth
import { isAuthenticated } from "../services/auth";

//Components
import BackgroundTitle from "../components/background-title/Background-title";

//CSS
import "../styles/login.css";

//Alert
import { useAlert } from "react-alert";

function initialState() {
	return { user: "", password: "" };
}

function LoginComponent({ isLogged, setName, signIn }) {
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

		signIn(user, password, alert);

		setTimeout(() => setName(), 800); //Tempo necessário para o localstorage ser preenchido
	}

	return (
		<div id="page-login" className="page-position">
			<main>
				<form onSubmit={onSubmit}>
					<div className="input-block">
						<label htmlFor="user" className="label-span">
							Login
							<span>Informe o e-mail para login</span>
						</label>
						<input
							id="user"
							name="user"
							value={user}
							type="text"
							maxLength="50"
							placeholder="candidato@email.com"
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
							placeholder="Senha"
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

						<Link to="/recuperar-senha">Esqueci minha senha</Link>
						{/*só pra commitar*/}
						{/*só pra commitar*/}
						{/*só pra commitar*/}
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

const mapDispatchToProps = (dispatch) => ({
	signIn: (user, password, alert) =>
		dispatch(signInAction(user, password, alert)),
	setName: () => dispatch(setNameAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent); // { signIn })(Login);
