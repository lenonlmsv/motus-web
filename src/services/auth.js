import api from "./api";

export const isAuthenticated = () => {
	if (getToken() !== null && getHashId() !== null) {
		return true;
	}
	return false;
};

export async function login(token) {
	let token_exp = new Date();
	token_exp.setHours(token_exp.getHours() + 2);
	localStorage.setItem("TOKEN_KEY", token);
	localStorage.setItem("TOKEN_EXPIRESAT", token_exp);
	api.get("/candidato/").then((response) => {
		setHash(response.data.responseData.hashId);
		setUserName(response.data.responseData.nome);
	});
}

/*export async function firstLogin(token) {
	let token_exp = new Date();
	localStorage.setItem("TOKEN_KEY", token);
	localStorage.setItem(
		"TOKEN_EXPIRESAT",
		token_exp.setHours(token_exp.getHours() + 2)
	);
	api.get("/candidato/").then((response) => {
		setHash(response.data.responseData.hashId);
		setUserName(response.data.responseData.nome);
	});
}*/

export const getExpirationDate = () => localStorage.getItem("TOKEN_EXPIRESAT");
export const getToken = () => localStorage.getItem("TOKEN_KEY");
export const getHashId = () => localStorage.getItem("HASH_ID");
export const getUserName = () => localStorage.getItem("USER_NAME");

export const setHash = (hash) => {
	localStorage.setItem("HASH_ID", hash);
};
export const setUserName = (name) => {
	localStorage.setItem("USER_NAME", name);
};

export async function logout() {
	localStorage.removeItem("TOKEN_KEY");
	localStorage.removeItem("HASH_ID");
	localStorage.removeItem("USER_NAME");
	localStorage.removeItem("TOKEN_EXPIRESAT");
}
