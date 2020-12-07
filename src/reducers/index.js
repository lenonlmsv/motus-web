import {createStore} from 'redux';

//Auth
import {getUserName, isAuthenticated, login, logout} from '../services/auth'

const ISLOGGED = {
    Auth: isAuthenticated(),
    userName: getUserName()
}

function reducer(state = isAuthenticated(), action) {
    if(action.type === 'LOGOUT') {
        logout();
        return false;
    }

    else if(action.type === 'LOGIN') {
        return true;
    }

    return state;
}

const IsLogged = createStore(reducer);

export default IsLogged;