import {createStore} from 'redux';

//Auth
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

    return state;
}

const IsLogged = createStore(reducer);

export default IsLogged;