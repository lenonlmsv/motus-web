import React, { useEffect, useState } from "react";

//Router dom
import { Link, useParams, useHistory } from "react-router-dom";

import { updateCandidato } from "../store/actions";

//CSS
import "../styles/candidate-detail.css";

//Components
import BackgroundTitle from "../components/background-title/Background-title";
import ResumesList from "../components/resumes-list/ResumesList";
import { InputPhoneNumber, InputPhone } from "../components/Input";

//API and Auth
import api from "../services/api";
import { getHashId, setUserName } from "../services/auth";
import { fetchCandidato } from "../store/actions";

//Alert
import { useAlert } from "react-alert";
import { connect } from "react-redux";

const CandidatoForm = (props) => {
	const [candidato, setCandidato] = useState({});

	console.log("Inicio candidato props");
	console.log(props.candidato);
	console.log(candidato);
	console.log("Fim candidato props");

	const history = useHistory();
	const alert = useAlert();

	async function handleSubmit(e) {
		e.preventDefault();
		props.updateCandidato(candidato, alert, history);
	}

	useEffect(() => {
		console.log("Usou useEffect");
		setCandidato(props.candidato);
	}, [props.candidato]);

	return (
		<div id="page-candidate-details" className="page-position">
			<BackgroundTitle
				title={`Meus dados TESTE`}
				description={"Confira seus dados cadastrados"}
			/>

			<main className="display-flex">
				<form className="create-candidate" onSubmit={handleSubmit}>
					<div className="input-block">
						<label htmlFor="name">Nome</label>
						<input
							id="name"
							value={candidato.nome}
							type="text"
							maxLength="50"
							onChange={(event) => {
								setCandidato({
									...candidato,
									nome: event.target.value,
								});
							}}
							required
						/>
					</div>
					<div className="input-block">
						<label htmlFor="email">
							E-mail
							<span>O seu e-mail não pode ser alterado</span>
						</label>
						<input
							type="email"
							id="email"
							maxLength="40"
							onChange={(event) => {
								setCandidato({
									...candidato,
									email: event.target.value,
								});
							}}
							value={candidato.email}
							//disabled
						/>
					</div>
					<div className="input-block">
						<label htmlFor="linkedin">
							Linkedin
							<span>Informe a url para seu perfil</span>
						</label>

						<input
							id="linkedin"
							type="text"
							maxLength="100"
							onChange={(event) => {
								setCandidato({
									...candidato,
									linkedin: event.target.value,
								});
							}}
							value={candidato.linkedin}
							required
						/>
					</div>
					<div className="input-block">
						<label htmlFor="phone-number">
							Celular
							<span>
								Formato: 11 dígitos com DDD (21999999999)
							</span>
						</label>

						<InputPhoneNumber
							value={candidato.celular}
							onChange={(event) => {
								setCandidato({
									...candidato,
									celular: event.target.value,
								});
							}}
						/>
					</div>
					<div className="input-block">
						<label>
							Telefone
							<span>
								Formato: 10 dígitos com DDD (2133333333)
							</span>
						</label>

						<InputPhone
							value={candidato.telefone}
							onChange={(event) => {
								setCandidato({
									...candidato,
									telefone: event.target.value,
								});
							}}
						/>
					</div>
					<div className="input-block">
						<label
							htmlFor="change-password"
							style={{ cursor: "pointer" }}
						>
							Redefinir senha
							<span>
								Você receberá um e-mail parar alterar a senha de
								acesso
							</span>
						</label>
					</div>
					<div className="input-block">
						<label
							htmlFor="send-video"
							style={{ cursor: "pointer" }}
							onClick={() => history.push("/video-curriculo")}
						>
							Vídeo Currículo
							<span>
								Grave seu vídeo currículo e aumente suas chances
							</span>
						</label>
					</div>
					<ResumesList />
					<div className="display-flex button-send">
						<Link to="/" className="button button-secondary">
							Ver oportunidades
						</Link>

						<button
							type="submit"
							className="button button-primary send-form"
						>
							Enviar
						</button>

						<button
							type="submit"
							className="button button-primary send-form"
							//onClick={() => setCandidato(props.candidato)}
						>
							teste
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

const mapStateToProps = (state) => {
	console.log(state);
	return { candidato: state.candidato };
};

export default connect(mapStateToProps, { updateCandidato })(CandidatoForm);
