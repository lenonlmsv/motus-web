import React from 'react';

//Routes
import Routes from './routes';

//Components
import PageHeader from './components/page-header/page-header';

//CSS
import './styles/global.css'

function App() { 
    return (
        <div id="page-content" className="page-content">
                <PageHeader/>

                <Routes/>
        </div>
    )
}

export default App;