import React from 'react';

//Router
import {BrowserRouter, Link} from 'react-router-dom'

//Icons
import {FaBackward} from 'react-icons/fa';

function BackButton() {
    <div id="back-button">
        <BrowserRouter>
            <Link to='/oportunidades' className="button button-secondary">
                <FaBackward/>
                Voltar    
            </Link>    
        </BrowserRouter>
    </div>
}

export default BackButton;