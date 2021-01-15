import React, { createContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

//Components
import TituloPagina from "../ComponentesGlobais/TituloPagina/TituloPagina";
import OpportunitiesDetailCard from "./Componentes/OpportunitiesDetailCard";
import { getUserName } from "../../services/auth";
import QuestionsBlock from "./Componentes/questions-block/Questions-block";

import { connect, useSelector } from "react-redux";
//Methods
import {
	getOpportunitieDetail,
	createCandidature,
	checkIsCandidate,
} from "../../services/methods";

//CSS
import "./Styles/Oportunidades.css";

import {
	fetchOpportunityRedux,
	getCandidaturasRedux,
	createCandidaturaRedux,
} from "../../store/actions";
//Icons
import { FaUpload, FaDownload, FaRecordVinyl, FaCheck } from "react-icons/fa";
import { useAlert } from "react-alert";

export const userCandidature = createContext();

function OportunidadeDetalhes(props) {
	//History
	const history = useHistory();

	//Params
	const params = useParams();
	params.id === ":id" && history.push("/oportunidades");

	//if (state)
	const IsCandidato = props.candidaturas.filter(
		(candidato) => candidato.vagaId === parseInt(params.id)
	);

	//Alert
	const alert = useAlert();

	const showSuccess = (m) => {
		alert.show(m, { type: "success" });
	};

	if (typeof props.opportunity.responseData !== "undefined") {
		if (Object.keys(props.opportunity.responseData).length === 0) {
			history.push("/oportunidades");
		}
	}
	//States
	const [opportunity, setOpportunity] = useState([]);
	const [ifIsCandidate, setIfIsCandidate] = useState(false);

	//Context
	useEffect(() => {
		const fetchOpportunity = async () => {
			try {
				const response = await getOpportunitieDetail(params.id);

				//redireciona em caso de tentativa de manipulação da url
				response === null && history.push("/oportunidades");

				setOpportunity(response.data.responseData);

				//Busca os dados para checar se existe candidatura para esta vaga
				const checkIfIsCandidate = await checkIsCandidate();

				const opportunities = checkIfIsCandidate.opps.find(
					(opp) => opp == params.id
				);

				opportunities != undefined &&
					setIfIsCandidate(checkIfIsCandidate.status);
			} catch (e) {
				//console.log(e);
			}
		};

		props.getCandidaturasRedux(alert);
		props.fetchOpportunityRedux(params.id, alert);
	}, []);

	function createNewCandidature() {
		//Criar candidatura na base
		//setCheckCandidate(true);
		if (ifIsCandidate === false) {
			createCandidature(params.id);
			showSuccess(
				"Candidatura criada com sucesso! Prossiga para a próxima etapa"
			);
			setIfIsCandidate(true);
		}
	}
	////console.log(props.opportunity);

	return typeof props.opportunity.responseData !== "undefined" ? (
		<div id="page-opportunitie-details" className="page-position">
			<TituloPagina
				title={props.opportunity.responseData.titulo}
				description=""
			/>

			<div className="opportunitie-detail-description">
				{
					//<strong>Número de vagas:</strong>
					//<p id="opportunitie-name">199</p>
				}

				<OpportunitiesDetailCard
					jobDescription={
						props.opportunity.responseData.descricaoVaga
					}
					jobType={"Não informado"}
					workTime={props.opportunity.responseData.horarioTrabalho}
					habilities={
						props.opportunity.responseData.requisitoDesejavel
					}
				/>

				{
					/*!ifIsCandidate*/ IsCandidato.length === 0 && (
						<button
							onClick={() =>
								props.createCandidaturaRedux(params.id, alert)
							}
							className="button button-primary opportunitie-button"
						>
							Quero me candidatar
						</button>
					)
				}
			</div>

			{
				/*ifIsCandidate*/ IsCandidato.length !== 0 && (
					<div>
						<div id="record-videos">
							<p>
								{`Olá, ${getUserName()}. Você está se candidatando a
							vaga de ${
								props.opportunity.responseData.titulo
							}. Já temos seu CV, agora precisamos que você responda as perguntas abaixo. Por favor, responda as questões abaixo em vídeo:`}
							</p>

							<p></p>
						</div>

						<QuestionsBlock />
					</div>
				)
			}

			<div className="return">
				<Link to="/oportunidades/" className="button button-secondary">
					Ver outras oportunidades
				</Link>
			</div>
		</div>
	) : null;
}

const mapStateToProps = (state, ownProps) => {
	return {
		opportunity: state.opportunities,
		userNameRedux: state.UserName,
		candidaturas:
			state.candidatura /*.find(
			(candidato) => candidato.vagaId === ownProps.params.id
		),*/,
	};
};

export default connect(mapStateToProps, {
	fetchOpportunityRedux,
	createCandidaturaRedux,
	getCandidaturasRedux,
})(OportunidadeDetalhes);
