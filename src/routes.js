import React from "react";

//Routes
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Pages
import Opportunities from './pages/opportunities';
import OpportunitieDetail from './pages/opportunitie-details'
import Login from './pages/login'
import VideoResume from "./pages/video-resume";
import VideoRecord from "./pages/video-recorder";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/oportunidades" exact component={Opportunities}/>
                <Route path="/oportunidades/:id" component={OpportunitieDetail}/>
                <Route path="/video-curriculo" component={VideoResume}/>
                <Route path="/gravar-video" componente={VideoRecord}/>
            </Switch>
        </BrowserRouter>
    )
import Opportunities from "./pages/opportunities";
import OpportunitieDetail from "./pages/opportunitie-details";
import Login from "./pages/login";
import VideoResume from "./pages/video-resume";
import VideoRecord from "./pages/video-recorder";

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
				<Route path="/Login" exact component={Login}/>
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
