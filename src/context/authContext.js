import createDataContext from "./createDataContext";

const authReducer = (state, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

const signin = (dispatch) => {
	return ({ email, password }) => {
		// implementar logica de signin utilizando axios
		console.log("Entrou aqui");
		try {
			if ((email === "admin") & (password === "admin"))
				console.log("Admin logou");
			else console.log("Ninguem logou");
		} catch (error) {
			console.log(error.message);
		}
	};
};

const signup = (dispatch) => {
	return ({ email, password }) => {
		// implementar
	};
};

const signout = (dispatch) => {
	return () => {};
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{},
	{ isSignedIn: false }
);
