import React, { useState, useContext } from "react";

//Auth
import { Context as AuthContext } from "../context/authContext";

//Components
import BackgroundTitle from "../components/background-title/background-title";

//CSS
import "../styles/login.css";

function initialState() {
	return { user: "", password: "" };
}

const Login = () => {
	const { state, signin } = useContext(AuthContext);
	const [values, setValues] = useState(initialState);

	function onChange(e) {
		const { value, name } = e.target;

		setValues({
			[name]: value,
		});

		console.log(values.name);
	}

	const onSubmit = (e) => {
		e.preventDefault();
		//return () => signin({ email: values.user, password: values.password });
		//signin({ email: values.user, password: values.password });
		console.log("Funciona");
	};

	return (
		<div>
			<BackgroundTitle
				title="Login"
				description="Informe suas credenciais para acessar o sistema"
			/>

			<form onSubmit={onSubmit}>
				<div className="input-block">
					<label htmlFor="name">
						Login
						<span>Informe o e-mail para login</span>
					</label>
					<input
						id="user"
						name="user"
						value={values.user}
						type="text"
						maxLength="50"
						onChange={onChange}
						required
					/>
				</div>

				<div className="input-block">
					<label htmlFor="password">Senha</label>

					<input
						id="password"
						name="password"
						value={values.password}
						type="password"
						maxLength="10"
						onChange={onChange}
						required
					/>
				</div>

				<button
					type="submit"
					className="button button-primary"
					onSubmit={() =>
						signin({
							email: values.user,
							password: values.password,
						})
					}
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
