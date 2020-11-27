import React, { useState, useEffect } from "react";

//Routes
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//Authentication
import { isAuthenticated } from './services/auth'

//Context
import { Provider as AuthProvider } from "./context/authContext";

//Components
import PageHeader from "./components/page-header/Page-header";
import PageFooter from "./components/page-footer/Page-footer";

//Pages
import Opportunities from "./pages/opportunities";
import OpportunitieDetail from "./pages/opportunitie-details";
import Login from "./pages/login";
import VideoResume from "./pages/video-resume";
import VideoRecord from "./pages/video-recorder";
import CandidateDetails from './pages/candidate-detail';
import PageNotFound from './pages/page-not-found'

const PrivateRoute = ({ component: Component, ...rest }) => ( //Bloqueia de acordo com a autenticação
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
			<PageHeader/>

			<AuthProvider>

				<Switch style={{alignSelf:"center"}}>
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

			<PageFooter/>


		</BrowserRouter>
	);
}

export default Routes;
