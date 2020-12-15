import api from "../../services/api";
import { login } from "../../services/auth";
//import Alert from "../../components/Alert";
import setUserName from "../reducers/set-user-name";

const ShowError = (message, alert) => {
	//const alert = useAlert();
	alert.show(message, { type: "error" });
};

const ShowSuccess = (message, alert) => {
	//const alert = useAlert();
	alert.show(message, { type: "success" });
};

export const signIn = (email, senha, alert) => {
	api.defaults.headers.post["Content-Type"] = "application/json";
	return async function (dispatch) {
		try {
			const response = await api.post("/api/service/login", {
				login: email,
				password: senha,
			});
			const string = response.data.split(" ");
			const token = string[1]; //Get token
			login(token);
			ShowSuccess("Login realizado com sucesso", alert);
			dispatch({
				type: "LOGIN",
				payload: response.data,
			});
		} catch (error) {
			switch (error.message) {
				case "Request failed with status code 403":
					ShowError("Usuário não encontrado", alert);
					break;
				default:
					ShowError("Erro inesperado ao realizar login", alert);
			}
		}
	};
};

export const fetchOpportunitiesRedux = (
	page,
	totalItems,
	searchText,
	alert
) => {
	searchText !== "" && (searchText = `?busca=${searchText}`);
	return async function (dispatch) {
		try {
			const response = await api.get(
				`/oportunidade/${page}/${totalItems}/${searchText}`
			);
			dispatch({
				type: "GET_OPPORTUNITIES",
				payload: response.data.responseData,
			});
		} catch (error) {
			switch (error.message) {
				default:
					ShowError("Erro inesperado ao buscar oportunidades", alert);
			}
		}
	};
};

export const fetchOpportunityRedux = (idOpportunity = 0) => {
	return async function (dispatch) {
		try {
			const response = await api.get(`/oportunidade/${idOpportunity}`);
			dispatch({
				type: "GET_OPPORTUNITY",
				payload: response.data.responseData,
			});
		} catch (error) {
			switch (error.message) {
				default:
					//ShowError("Erro inesperado ao buscar oportunidade", alert);
					break;
			}
		}
	};
};

export const checkIfCandidatoRedux = (idOpportunity) => {
	return async function (dispatch) {
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
		try {
			const response = await api.get(`candidatura/`);

			dispatch({
				type: "GET_CANDIDATURA",
				payload: response.data.responseData,
			});
		} catch (error) {
			switch (error.message) {
				default:
					//ShowError("Erro inesperado ao criar candidatura", alert);
					break;
			}
		}
	};
};

export const createCandidaturaRedux = (idOpportunity) => {
	return async function (dispatch) {
		try {
			const response = await api.post(`candidatura/${idOpportunity}`);
			dispatch({
				type: "CREATE_CANDIDATURA",
				payload: response.data.responseData,
			});
		} catch (error) {
			switch (error.message) {
				default:
					//ShowError("Erro inesperado ao criar candidatura", alert);
					break;
			}
		}
	};
};

export const fetchCandidato = () => {
	return async function (dispatch) {
		const response = await api.get(`/candidato`);
		dispatch({
			type: "GET_CANDIDATO",
			payload: response.data.responseData,
		});
	};
};

export const updateCandidato = (candidato, alert, history) => {
	return async function (dispatch) {
		try {
			api.defaults.headers.post["Content-Type"] = "application/json"; //USAR FORMATO JSON

			let json = JSON.stringify(candidato);

			await api.post("/candidato", json);
			//setUserName(candidato.nome);
			ShowSuccess("Usuário alterado com sucesso", alert);
			history.push("/oportunidades");
		} catch (error) {
			console.log(`${error.message}`);
			ShowError("Erro ao editar usuário. Tente novamente!", alert);
		}

		dispatch({
			type: "UPDATE_CANDIDATO",
			payload: candidato,
		});
	};
};
