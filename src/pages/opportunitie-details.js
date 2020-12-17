import React, { createContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

//Components
import BackgroundTitle from "../components/background-title/Background-title";
import OpportunitiesDetailCard from "../components/opportunities/OpportunitiesDetailCard";
import { getUserName } from "../services/auth";

import { connect, useSelector } from "react-redux";
//Methods
import {
	getOpportunitieDetail,
	createCandidature,
	checkIsCandidate,
} from "../services/methods";

//CSS
import "../styles/opportunitie-details.css";

import {
	fetchOpportunityRedux,
	getCandidaturasRedux,
	createCandidaturaRedux,
} from "../store/actions";
//Icons
import { FaUpload, FaDownload, FaRecordVinyl, FaCheck } from "react-icons/fa";
import { useAlert } from "react-alert";

export const userCandidature = createContext();

function OpportunitieDetail(props) {
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
				console.log(e);
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
	//console.log(props.opportunity);

	return typeof props.opportunity.responseData !== "undefined" ? (
		<div id="page-opportunitie-details" className="page-position">
			<BackgroundTitle
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
							className="button button-secondary opportunitie-button"
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
								opportunity.titulo
							}. Já temos seu CV, agora precisamos que você responda as perguntas abaixo. Por favor, responda as questões abaixo em vídeo:`}
							</p>

							<p></p>
						</div>

						<div id="video-questions">
							<div className="questions">
								<div className="question">
									Fale um pouco sobre você{" "}
									<FaCheck className="question-check" />
								</div>

								<div className="actions">
									<label
										htmlFor="send-video"
										className="send-button"
									>
										<FaUpload className="send-button-icon" />
										Enviar Vídeo
									</label>

									<input
										id="send-video"
										type="file"
										className="send-button"
										style={{ display: "none" }}
									/>

									<Link
										to={`/gravar-video/${params.id}`}
										className="send-button"
									>
										{
											//Retornar para video/:id
										}
										<FaRecordVinyl className="send-button-icon" />
										Gravar vídeo
									</Link>

									<button className="send-button">
										<FaDownload className="send-button-icon" />
										Download
									</button>
								</div>
							</div>
						</div>

						<div id="message">
							<p>Parabéns! Você está concorrendo a esta vaga!</p>
						</div>
					</div>
				)
			}

			<div className="return">
				<Link to="/oportunidades/" className="button button-secondary">
					Ver oportunidades
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
})(OpportunitieDetail);
