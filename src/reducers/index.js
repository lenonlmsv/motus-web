import { createStore } from "redux";
import { combineReducers } from "redux";

//Auth
<<<<<<< HEAD
import {getHashId, isAuthenticated, getUserName, logout} from '../services/auth'

console.log(isAuthenticated())

const INITIAL_STATE = {
    auth: isAuthenticated(),
    userName: getUserName(),
}

function reducer(state = INITIAL_STATE, action) {
    if(action.type === 'LOGOUT') {
        logout();
        return {
            ...state,
            auth: false,
            userName: '',
        }
    }

    if(action.type === 'LOGIN') {
        logout();
        return {
            ...state,
            auth: true,
            userName: action.userName,
        }
    }
=======
import { getUserName, isAuthenticated, login, logout } from "../services/auth";

const ISLOGGED = {
	Auth: isAuthenticated(),
	userName: getUserName(),
};

function authReducer(state = isAuthenticated(), action) {
	if (action.type === "LOGOUT") {
		logout();
		return false;
	} else if (action.type === "LOGIN") {
		return true;
	}
>>>>>>> 330dbaa0781e51bf3a3bf56854996518d71c3510

	return state;
}

//const IsLogged = createStore(reducer);

export default combineReducers({
	IsLogged: authReducer,
});
