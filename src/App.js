import React from 'react';

//Routes
import Routes from './routes';

//Components
import PageHeader from './components/page-header/page-header';
import PageFooter from './components/page-footer/page-footer';
//import CheckLogin from './components/login-redirect/login';

//CSS
import './styles/global.css'

function App() { 
    return (
        <div id="page-content">
                <PageHeader/>

                <div className="router-content">
                    <Routes/>
                </div>
                
                <PageFooter/>
        </div>
    )
}

export default App;