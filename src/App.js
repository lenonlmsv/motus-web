import React from 'react';

//Routes
import Routes from './routes';

//Components
import PageHeader from './components/page-header/page-header';

function App() { 
    return (
        <div id="page-content">
        <PageHeader/>

        <Routes/>
        
        </div>
    )
}

export default App;