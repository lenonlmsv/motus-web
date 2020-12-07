import React from 'react';

//Router dom
import { useHistory, Link } from 'react-router-dom'

//CSS
import './styles/login-bar.css'

//Components
import {getHashId, getUserName, isAuthenticated, logout, reloadPage} from '../../services/auth';

export default function LoginBar() {
    const history = useHistory();

    const hashId = getHashId();
    const userName = getUserName();

    function triggerLogout() {
        logout();
        history.push('/login');
        reloadPage()
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
        return (
            <div>
                <Link to='/login' className='button button-primary'>Login</Link>
            </div>
        )
    }
}