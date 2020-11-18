import React from "react";

//Routes
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Pages
<<<<<<< HEAD
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
=======
import Opportunities from "./pages/opportunities";
import Login from "./pages/login";

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Opportunities} />
				<Route path="/Login" exact component={Login} />
			</Switch>
		</BrowserRouter>
	);
>>>>>>> 755141ceb36e3f0c6e0305689415f3b9d2cebb66
}

export default Routes;
