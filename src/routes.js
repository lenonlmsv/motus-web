import React from 'react';

//Routes
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//Pages
import Opportunities from './pages/opportunities';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Opportunities}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;