import React from "react";

//Routes
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//Authentication
import { isAuthenticated } from "./services/auth";

//Components
import PageHeader from "./components/page-header/Page-header";
import PageFooter from "./components/page-footer/Page-footer";

//Pages
import Opportunities from "./pages/opportunities";
import OpportunitieDetail from "./pages/opportunitie-details";

import VideoResume from "./pages/video-resume";
import VideoRecord from "./pages/video-recorder";
import CandidateDetails from "./pages/candidate-detail";
import PageNotFound from "./pages/page-not-found";
import CandidateSignUp from "./pages/candidate-signup";
import CandidateDetailsTeste from "./pages/candidate-detail-teste";
import RecuperarSenha from "./pages/recuperar-senha";
import TrocarSenhar from "./pages/trocar-senha";

const PrivateRoute = (
	{ component: Component, ...rest } //Bloqueia de acordo com a autenticação
) => (
	<Route
		{...rest}
		render={(props) =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect
					to={{
						pathname: "/oportunidades",
						state: { from: props.location },
					}}
				/>
			)
		}
	/>
);

function Routes() {
	return (
		<BrowserRouter>
			<PageHeader />

			<Switch style={{ alignSelf: "center" }}>
				<Route path="/" exact component={Opportunities} />

				<Route path="/oportunidades" exact component={Opportunities} />

				<Route
					path="/recuperar-senha"
					exact
					component={RecuperarSenha}
				/>

				<PrivateRoute
					path="/candidato/:id"
					component={CandidateDetails}
				/>

				<PrivateRoute path="/trocar-senha" component={TrocarSenhar} />

				{
					//TODO: Excluir depois, apenas um teste
				}
				<PrivateRoute
					path="/candidatoteste/:id"
					component={CandidateDetailsTeste}
				/>

				<Route path="/cadastro" component={CandidateSignUp} />

				<PrivateRoute
					path="/oportunidades/:id"
					component={OpportunitieDetail}
				/>

				<PrivateRoute path="/video-curriculo" component={VideoResume} />

				<PrivateRoute
					path="/gravar-video/:id"
					component={VideoRecord}
				/>

				<Route path="*" component={PageNotFound} />
			</Switch>

			<PageFooter />
		</BrowserRouter>
	);
}

export default Routes;
