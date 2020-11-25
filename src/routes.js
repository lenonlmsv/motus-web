import React from "react";

//Routes
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//Authentication
import { isAuthenticated } from './services/auth'

//Context
import { Provider as AuthProvider } from "./context/authContext";

//Pages
import Opportunities from "./pages/opportunities";
import OpportunitieDetail from "./pages/opportunitie-details";
import Login from "./pages/login";
import VideoResume from "./pages/video-resume";
import VideoRecord from "./pages/video-recorder";
import CandidateDetails from './pages/candidate-detail';
import PageNotFound from './pages/page-not-found'

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
		isAuthenticated() ? (
			<Component {...props}/>
		) : (
			<Redirect to={{ pathname: '/login', state: { from: props.location }}}/>
		)
	)}
	/>
)

function Routes() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Switch>
					<Route 
						path="/" 
						exact 
						component={Opportunities}/>
					
					<Route
						path="/oportunidades"
						exact
						component={Opportunities}
					/>

					<Route 
						path="/login" 
						component={Login}/>

					<Route
						path="/candidato/cadastro"
						component={CandidateDetails}/>
					
					<PrivateRoute 
						path="/candidato/:id" 
						component={CandidateDetails}/>
					

					<PrivateRoute
						path="/oportunidades/:id"
						component={OpportunitieDetail}
					/>

					<PrivateRoute 
						path="/video-curriculo" 
						component={VideoResume} />
					
					<PrivateRoute 
						path="/gravar-video/:id" 
						component={VideoRecord} />
					
					<Route 
						path="*" 
						component={PageNotFound}/>
				</Switch>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default Routes;
