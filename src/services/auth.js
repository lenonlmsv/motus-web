import api from "./api";

export const isAuthenticated = () => {
    if(getToken() !== null && getHashId() !== null) {
        return true   
    } 
}

export async function login(token) {
    localStorage.setItem('TOKEN_KEY', token);
    api.get('/candidato/').then( response => {
        setHash(response.data.responseData.hashId);
        setUserName(response.data.responseData.nome);
        reloadPage();
    });
};

export async function firstLogin(token) {
    localStorage.setItem('TOKEN_KEY', token);
    api.get('/candidato/').then( response => {
        setHash(response.data.responseData.hashId);
        setUserName(response.data.responseData.nome);
    });
}

export const getToken = () => localStorage.getItem('TOKEN_KEY');
export const getHashId = () => localStorage.getItem('HASH_ID');
export const getUserName = () => localStorage.getItem('USER_NAME');

const setHash = hash => {localStorage.setItem('HASH_ID',hash)}
const setUserName = name => {localStorage.setItem('USER_NAME',name)}

export async function logout() {
    localStorage.removeItem('TOKEN_KEY');
    localStorage.removeItem('HASH_ID');
    localStorage.removeItem('USER_NAME');
    //reloadPage();
}

export function reloadPage() {
    window.location.reload();
}