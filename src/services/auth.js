import React from 'react';
import api from "./api";

export const isAuthenticated = () => {
    if(getToken() !== null && getHashId() !== null) {
        return true   
    } 
}

export const login = (token) => {
    localStorage.setItem('TOKEN_KEY', token);
    getUserData();
};

const getUserData = () => {
    api.get('/candidato/').then( response => {
        setHash(response.data.responseData.hashId);
        setUserName(response.data.responseData.nome);
        reloadPage()
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
    reloadPage();
}

function reloadPage() {
    window.location.reload();
}