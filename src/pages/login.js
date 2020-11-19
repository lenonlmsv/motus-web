import React, { useState, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

function initialState() {
	return { user: "", password: "" };
}

const Login = () => {
	const { state, signin } = useContext(AuthContext);
	const [values, setValues] = useState(initialState);

	function onChange(event) {
		const { value, name } = event.target;

		console.log("Esta no OnChange");
		setValues({
			...value,
			[name]: value,
		});
	}

	const onSubmit = (event) => {
		event.preventDefault();
		//return () => signin({ email: values.user, password: values.password });
	};

	return (
		<div style={teste.Div}>
			<form
				onSubmit={() =>
					signin({ email: values.user, password: values.password })
				}
			>
				<div>
					<label>Login</label>
					<input
						id="user"
						type="text"
						name="user"
						onChange={onChange}
						value={values.user}
					/>
				</div>
				<div>
					<label>Senha</label>
					<input
						id="password"
						type="password"
						name="password"
						onChange={onChange}
						value={values.password}
					></input>
				</div>
				<button style={teste.Button} type="submit">
					"Login"
				</button>
			</form>
		</div>
	);
};

const teste = {
	Div: {
		bordeColor: "red",
		bordeWidth: 10,
		margin: 100,
		backgroundColor: "rgb(230, 230,230)",
		flex: 1,
		justifyContent: "center",
	},
	Button: {
		backgroundcolor: `rgb(0, 0, 255)`,
	},
};

export default Login;
