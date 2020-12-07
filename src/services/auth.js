import api from "./api";

export const isAuthenticated = () => {
	if (getToken() !== null && getHashId() !== null) {
		return true;
	}
	return false;
};

export async function login(token) {
<<<<<<< HEAD
    api.defaults.headers.post['Content-Type'] = 'application/json'; //USAR FORMATO JSON

    setToken(token);
    console.log(getToken())
    api.get('/candidato/').then( response => {
        setHash(response.data.responseData.hashId);
        setUserName(response.data.responseData.nome);
    });
=======
	localStorage.setItem("TOKEN_KEY", token);
	api.get("/candidato/").then((response) => {
		setHash(response.data.responseData.hashId);
		setUserName(response.data.responseData.nome);
	});
}

export async function firstLogin(token) {
	localStorage.setItem("TOKEN_KEY", token);
	api.get("/candidato/").then((response) => {
		setHash(response.data.responseData.hashId);
		setUserName(response.data.responseData.nome);
	});
>>>>>>> 330dbaa0781e51bf3a3bf56854996518d71c3510
}

export const getToken = () => localStorage.getItem("TOKEN_KEY");
export const getHashId = () => localStorage.getItem("HASH_ID");
export const getUserName = () => localStorage.getItem("USER_NAME");

<<<<<<< HEAD
const setHash = hash => {localStorage.setItem('HASH_ID',hash)}
export const setUserName = name => {localStorage.setItem('USER_NAME',name)}
const setToken = token => {localStorage.setItem('TOKEN_KEY',token)}


export function logout() {
    localStorage.removeItem('TOKEN_KEY');
    localStorage.removeItem('HASH_ID');
    localStorage.removeItem('USER_NAME');
}
=======
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
}
>>>>>>> 330dbaa0781e51bf3a3bf56854996518d71c3510
