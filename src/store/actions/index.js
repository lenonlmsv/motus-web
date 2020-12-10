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
		console.log(token);
		dispatch({
			type: "LOGIN",
			payload: response.data,
		});
	};
};

export const fetchOpportunitiesRedux = (page, totalItems, searchText) => {
	searchText !== "" && (searchText = `?busca=${searchText}`);
	return async function (dispatch) {
		//console.log("Chamou a action");
		const response = await api.get(
			`/oportunidade/${page}/${totalItems}/${searchText}`
		);
		dispatch({
			type: "GET_OPPORTUNITIES",
			payload: response.data.responseData,
		});
	};
};

export const fetchOpportunityRedux = (idOpportunity = 0) => {
	//console.log("Tá na action");
	return async function (dispatch) {
		//console.log("Chamou a action");
		const response = await api.get(`/oportunidade/${idOpportunity}`);
		dispatch({
			type: "GET_OPPORTUNITY",
			payload: response.data.responseData,
		});
	};
};

export const checkIfCandidatoRedux = (idOpportunity) => {
	return async function (dispatch) {
		//console.log("Chamou a action");
		const response = await api.get(`candidatura/`);
		dispatch({
			type: "CHECK_CANDIDATURA",
			payload: {
				candidaturas: response.data.responseData,
				idOpportunity: parseInt(idOpportunity),
			},
		});
	};
};

export const getCandidaturasRedux = () => {
	return async function (dispatch) {
		//console.log("Chamou a action");
		const response = await api.get(`candidatura/`);
		console.log("candidatura");
		console.log(response.data.responseData);
		dispatch({
			type: "GET_CANDIDATURA",
			payload: response.data.responseData,
		});
	};
};

export const createCandidaturaRedux = (idOpportunity) => {
	return async function (dispatch) {
		//console.log("Chamou a action");
		const response = await api.post(`candidatura/${idOpportunity}`);
		dispatch({
			type: "CREATE_CANDIDATURA",
			payload: response.data.responseData,
		});
	};
};

/*export const fetchOpportunityRedux = (idOpportunity = 0) => {
	//console.log("Tá na action");
	return { type: "GET_OPPORTUNITY", payload: parseInt(idOpportunity) };
};*/
