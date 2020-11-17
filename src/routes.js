import React from "react";

//Routes
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Pages
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
}

export default Routes;
