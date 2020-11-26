import React, { useEffect, useState } from 'react';

//Router
import { Link, useHistory } from 'react-router-dom'

//CSS
import './styles/login-bar.css'

//Components
import {getHashId, getUserName, isAuthenticated, logout} from '../../services/auth';

export default function LoginBar() {
    const history = useHistory();
    
    const [isLogged, setIsLogged] = useState(isAuthenticated());
    const [hashId, setHashId] = useState(getHashId());
    const [userName, setUserName] = useState(getUserName);
    
    /*useEffect(() => {
        setIslogged(isAuthenticated())
    })*/

    const triggerLogout =() => {
        //history.push('/oportunidades');
        logout();
        history.push('/login')
    }
    
    if(isLogged) {
        return (
            <div id="login-bar">
                <div className="div-limited display-flex">
                    <p className="hide-long-content">{`Candidato ${userName}`}</p>
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