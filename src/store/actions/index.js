import api from "../../services/api";
import { login } from "../../services/auth";
import { ShowError, ShowSuccess } from "../../services/methods";

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
			//console.log(token);
			ShowSuccess("Login realizado com sucesso", alert);
			dispatch({
				type: "LOGIN",
				payload: response.data,
			});
			return true;
		} catch (error) {
			switch (error.message) {
				case "Request failed with status code 403":
					ShowError("Usuário não encontrado", alert);
					break;
				default:
					ShowError("Erro inesperado ao realizar login", alert);
			}
			return false;
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
				payload: response.data,
			});
		} catch (error) {
			switch (error.message) {
				default:
					ShowError("Erro inesperado ao buscar oportunidade", alert);
			}
		}
	};
};

export const fetchOpportunityRedux = (idOpportunity, alert) => {
	return async function (dispatch) {
		try {
			const response = await api.get(`/oportunidade/${idOpportunity}`);
			dispatch({
				type: "GET_OPPORTUNITY",
				payload: response.data,
			});
		} catch (error) {
			switch (error.message) {
				default:
					ShowError("Erro inesperado ao buscar oportunidade", alert);
					break;
			}
			var empty = [];
			dispatch({
				type: "OPPORTUNITY_ERROR",
				payload: { responseData: {} },
			});
		}
	};
};

//N sendo usado em lugar nenhum por enquanto
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

export const getCandidaturasRedux = (alert) => {
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
					//ShowError("Erro inesperado ao buscar candidaturas", alert);
					break;
			}
		}
	};
};

export const createCandidaturaRedux = (idOpportunity, alert) => {
	return async function (dispatch) {
		try {
			api.defaults.headers.post["Content-Type"] = "application/json";

			const response = await api.post(`candidatura/${idOpportunity}`);

			ShowSuccess("Candidatura criada com sucesso", alert);

			dispatch({
				type: "CREATE_CANDIDATURA",
				payload: response.data.responseData,
			});
		} catch (error) {
			switch (error.message) {
				default:
					ShowError("Erro inesperado ao criar candidatura", alert);
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
