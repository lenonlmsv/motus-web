import React, { useState } from 'react';

//CSS
import './styles/page-header.css'

//Routes
import { Link} from 'react-router-dom';

//Images
import sysLogo from '../../images/logo-sys-with-name.svg'
import { AiOutlineDown } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';

//Components
import LoginBar from "../login-bar/LoginBar";

function PageHeader() {
    const [showItens, setShowItens] = useState('hover-content-hide');

    const showOnHover = () => {
        setTimeout(() => {
            setShowItens('hover-content-show');
        }, 300); 
    }

    const hideOnBlur = (event) => {
        setTimeout(() => {
            setShowItens('hover-content-hide');
        }, 300); 
    }

    return (
        <div id="header-content">
            <header id="page-header">
                <div className="container-logo">
                    <a href="https://www.sysmanager.com.br">
                        <img className='sys-logo' src={sysLogo} alt='Sys-Logo'/>
                    </a>
                </div>

                <nav className="container-links">
                    <div onMouseOver={showOnHover} onMouseOut={hideOnBlur} className="link-item" id="hover-trigger">
                        <div className="div-hover">
                            SEJA BEM VINDO
                            <i>
                                <AiOutlineDown/>
                            </i>
                        </div>
                        <div className={showItens}>
                            <ul>
                                <li>
                                    <a href='https://www.sysmanager.com.br/quem-somos/'>
                                        Quem Somos
                                    </a>
                                </li>
                                
                                <li>
                                    <a href='https://www.sysmanager.com.br/clientes-e-parceiros/'>
                                        Clientes e parceros
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <a className="link-item" href="https://www.sysmanager.com.br/o-que-oferecemos/">
                        O QUE OFERECEMOS
                    </a>

                    <a className="link-item" href="https://www.sysmanager.com.br/resultados/">
                        RESULTADOS
                    </a>

                        <Link to="/" className="link-item">
                        JUNTE-SE A NÓS 
                        </Link>

                    <a className="link-item" href="https://www.sysmanager.com.br/contato/">
                        CONTATO
                    </a>
                </nav>

                <div className="container-linkedin">
                        <a className="backButton" href="https://www.sysmanager.com.br">
                            Voltar
                        </a>
                        <a 
                            target='_blank' 
                            rel="noreferrer noopener" 
                            href="https://www.linkedin.com/company/sys-manager-informática">
                            <FaLinkedinIn className="linkedinIcon"/>
                        </a>
                </div>
            </header>

            <LoginBar/>
        </div>
    )
}

export default PageHeader;