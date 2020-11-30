import React, { useEffect, useState, useContext } from 'react';

//Router
import { Link, useHistory } from 'react-router-dom'

//CSS
import './styles/login-bar.css'

//Components
import {getHashId, getUserName, isAuthenticated, logout} from '../../services/auth';

export default function LoginBar() {
    const history = useHistory();

    const hashId = getHashId();
    const userName = getUserName();

    async function triggerLogout() {
        logout();
        await alert('deslogado');
        history.push('/login')
    }
  
    if(isAuthenticated()) {
        return (
            <div id="login-bar">
                <div className="div-limited display-flex">
                    <p className="hide-long-content">{`Candidato(a) ${userName}`}</p>
                </div>
                
                <div className="logout-options">
                    <Link to={`/candidato/${hashId}`}>
                        {"Meus dados |"}
                    </Link>             

                    <Link onClick={triggerLogout} className="logout-button">
                        {"Logout"}
                    </Link>
                </div>
            </div>
        )
    }

    else {
        return (<p style={{display:'none'}}>Não logado</p>)
    }
}