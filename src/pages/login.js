import React, { useState } from "react";

function initialState() {
	return { user: "", password: "" };
}

const Login = () => {
	const [values, setValues] = useState(initialState);

	function onChange(event) {
		const { value, name } = event.target;

		setValues({
			...value,
			[name]: value,
		});
	}

	return (
		<div style={teste.Div}>
			<form>
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
				<button style={teste.Button}>"Login"</button>
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
