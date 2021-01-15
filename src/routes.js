import React from "react";

//Routes
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

//Authentication
import { isAuthenticated } from "./services/auth";

//Components
import Header from "./pages/ComponentesGlobais/Estrutura/Header";
import Footer from "./pages/ComponentesGlobais/Estrutura/Footer";

//Pages
import Oportunidades from "./pages/Oportunidades/Oportunidades";
import OportunidadeDetalhes from "./pages/Oportunidades/OportunidadeDetalhes";

import VideoResume from "./pages/Videos/video-resume";
import VideoRecord from "./pages/Videos/video-recorder";
import CandidatoDetalhes from "./pages/Candidato/CandidatoDetalhes";
import PageNotFound from "./pages/page-not-found";
import CandidatoAcesso from "./pages/Candidato/CandidatoAcesso";

import RecuperarSenha from "./pages/Login/recuperar-senha";
import TrocarSenhar from "./pages/Login/trocar-senha";

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
			<Header />

			<Switch style={{ alignSelf: "center" }}>
				<Route path="/" exact component={Oportunidades} />

				<Route path="/oportunidades" exact component={Oportunidades} />

				<Route
					path="/recuperar-senha"
					exact
					component={RecuperarSenha}
				/>

				<PrivateRoute
					path="/candidato/:id"
					component={CandidatoDetalhes}
				/>

				<PrivateRoute path="/trocar-senha" component={TrocarSenhar} />

				{
					//TODO: Excluir depois, apenas um teste
				}

				<Route path="/cadastro" component={CandidatoAcesso} />

				<PrivateRoute
					path="/oportunidades/:id"
					component={OportunidadeDetalhes}
				/>

				<PrivateRoute path="/video-curriculo" component={VideoResume} />

				<PrivateRoute
					path="/gravar-video/:id"
					component={VideoRecord}
				/>

				<Route path="*" component={PageNotFound} />
			</Switch>

			<Footer />
		</BrowserRouter>
	);
}

export default Routes;
