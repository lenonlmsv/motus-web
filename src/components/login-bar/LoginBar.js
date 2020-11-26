import React, { useState } from 'react';

//Router
import { Link, useHistory } from 'react-router-dom'

//CSS
import './styles/login-bar.css'

//Components
import {isAuthenticated, logout} from '../../services/auth'

export default function LoginBar() {   
    const history = useHistory()

    const [name, useName] = useState('Lenon Manhães da Silva Villeth')

    const triggerLogout =() => {
        //history.push('/oportunidades');
        logout();
        history.push('/login')
    }

    if(isAuthenticated()) {
        return (
            <div id="login-bar">
                <div className="div-limited display-flex">
                    <p className="hide-long-content">{name}</p>
                </div>
                
                <div className="logout-options">
                    <Link to="/candidato/:id">
                        {"Meus dados | "}
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