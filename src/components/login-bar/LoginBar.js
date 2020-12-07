import React from 'react';

//Router dom
import { Link } from 'react-router-dom'

//Contex
import {connect} from 'react-redux'

//CSS
import './styles/login-bar.css'

//Components
import {getHashId} from '../../services/auth';

function logoutREDUX() {
    return {
        type: 'LOGOUT'
    }
};

function LoginBar({isLogged, dispatch}) {    
    const hashId = getHashId();

    console.log(isLogged)

    if(isLogged.auth) {
        return (
            <div id="login-bar">
                <div className="div-limited display-flex">
                    <p className="hide-long-content">{`Candidato(a) ${isLogged.userName}`}</p>
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

export default connect(state => ({isLogged: state}))(LoginBar);