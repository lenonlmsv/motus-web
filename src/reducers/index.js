import {createStore} from 'redux';

//Auth
import {isAuthenticated, login, logout} from '../services/auth'

//const ISLOGGED = false;

function reducer(state = isAuthenticated(), action) {
    if(action.type === 'LOGOUT') {
        logout();
        return false;
    }

    else if(action.type === 'LOGIN') {
        console.log('REACT')
        return state;
    }

    return state;
}

const IsLogged = createStore(reducer);

export default IsLogged;