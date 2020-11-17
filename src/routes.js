import React from 'react';

//Routes
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Pages
import Opportunities from './pages/opportunities';
import OpportunitieDetail from './pages/opportunitie-details'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/oportunidades" exact component={Opportunities}/>
                <Route path="/oportunidades/:id" exact component={OpportunitieDetail}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;