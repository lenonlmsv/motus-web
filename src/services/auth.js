import api from "./api";

import {connect, useDispatch} from 'react-redux'

export const isAuthenticated = () => {
    if(getToken() !== null && getHashId() !== null) {
        return true   
    } 
}

function reportLogin() {
    return {
        type: 'LOGIN'
    }
}

export async function login(token) {
    localStorage.setItem('TOKEN_KEY', token);  
    api.get('/candidato/').then( response => {
        setHash(response.data.responseData.hashId);
        setUserName(response.data.responseData.nome);
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

export const setHash = hash => {localStorage.setItem('HASH_ID',hash)}
export const setUserName = name => {localStorage.setItem('USER_NAME',name)}

export async function logout() {
    localStorage.removeItem('TOKEN_KEY');
    localStorage.removeItem('HASH_ID');
    localStorage.removeItem('USER_NAME');
}

export function reloadPage() {
    window.location.reload();
}