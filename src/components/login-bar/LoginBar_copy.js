import React from 'react';

//Router dom
import { useHistory, Link } from 'react-router-dom'

//Contex
import {connect} from 'react-redux'

//CSS
import './styles/login-bar.css'

//Components
import {getHashId, getUserName, isAuthenticated, logout} from '../../services/auth';

function logoutREDUX() {
    return {
        type: 'LOGOUT'
    }
};

function LoginBar({isLogged, dispatch}) {
    const history = useHistory();
    console.log({redux: "REDUX", funciona: isLogged, logado: isAuthenticated()})

    const hashId = getHashId();
    const userName = getUserName();

    function triggerLogout() {
        logout();
        history.push('/login');
        //reloadPage()
    }
  
    if(isLogged) {
        return (
            <div id="login-bar">
                <div className="div-limited display-flex">
                    <p className="hide-long-content">{`Candidato(a) ${userName}`}</p>
                </div>
                
                <div className="logout-options">
                    <Link to={`/candidato/${hashId}`}>
                        {"Meus dados |"}
                    </Link>             

                    <Link onClick={() => {dispatch(logoutREDUX())}} className="logout-button">
                        {"Logout"}
                    </Link>
                </div>
            </div>
        )
    }

    else {
        return (
            <div>
                <Link to='/login' className='button button-primary'>Login</Link>
            </div>
        )
    }
}

export default connect(state => ({isLogged : state}))(LoginBar);