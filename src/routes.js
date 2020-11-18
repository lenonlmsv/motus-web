import React from "react";

//Routes
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Pages
import Opportunities from "./pages/opportunities";
import OpportunitieDetail from "./pages/opportunitie-details";
import Login from "./pages/login";

function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/oportunidades" exact component={Opportunities} />
				<Route
					path="/oportunidades/:id"
					exact
					component={OpportunitieDetail}
				/>
				<Route path="/Login" exact component={Login} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
