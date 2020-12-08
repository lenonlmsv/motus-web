import api from "../../services/api";
import { login } from "../../services/auth";

export const signIn = (email, senha) => {
	api.defaults.headers.post["Content-Type"] = "application/json";
	return async function (dispatch) {
		console.log("Chamou a action");
		const response = await api.post("/api/service/login", {
			login: email,
			password: senha,
		});
		const string = response.data.split(" ");
		const token = string[1]; //Get token
		login(token);
		dispatch({
			type: "LOGIN",
			payload: response.data,
		});
	};
};

/*export const fetchOpportunities = () => {
	return async function (dispatch) {
		console.log("Chamou a action");
		const response = await apiMotus.get("/oportunidade/1/10");
		dispatch({
			type: "GET_OPPORTUNITIES",
			payload: response.data.responseData,
		});
	};
};*/
