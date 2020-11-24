import React, { useContext } from "react";

//Routes
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Context
import { Provider as AuthProvider } from "./context/authContext";

//Pages
import Opportunities from "./pages/opportunities";
import OpportunitieDetail from "./pages/opportunitie-details";
import Login from "./pages/login";
import VideoResume from "./pages/video-resume";
import VideoRecord from "./pages/video-recorder";

function Routes() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Switch>
					<Route path="/login" component={Login}/>
					<Route
						path="/oportunidades"
						exact
						component={Opportunities}
					/>
					<Route
						path="/oportunidades/:id"
						component={OpportunitieDetail}
					/>
					<Route path="/video-curriculo" component={VideoResume} />
					<Route path="/gravar-video/:id" component={VideoRecord} />
				</Switch>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default Routes;
