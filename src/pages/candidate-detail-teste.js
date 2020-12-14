import React, { useEffect, useState } from "react";

//Router dom
import { Link, useParams, useHistory } from "react-router-dom";

//CSS
import "../styles/candidate-detail.css";

//Components
import BackgroundTitle from "../components/background-title/Background-title";
import ResumesList from "../components/resumes-list/ResumesList";
import { InputPhoneNumber, InputPhone } from "../components/Input";

//API and Auth
import api from "../services/api";
import { getHashId, setUserName } from "../services/auth";
import { fetchCandidato, UpdateCandidato } from "../store/actions";

//Alert
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import CandidatoForm from "../components/CandidatoForm";

function CandidateDetailsTeste(props) {
	const alert = useAlert();

	const showError = (message) => {
		alert.show(message, { type: "error" });
	};

	const showSuccess = (message) => {
		alert.show(message, { type: "success" });
	};

	const history = useHistory();
	const params = useParams();

	//Form data
	const [candidato, setCandidato] = useState({
		celular: "",
		email: "",
		hashId: "",
		linkedin: "",
		login: "",
		nome: "",
		telefone: "",
	});

	useEffect(() => {
		try {
			props.fetchCandidato();
			setCandidato(props.candidato);
		} catch (error) {
			console.log(error);
		}
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			api.defaults.headers.post["Content-Type"] = "application/json"; //USAR FORMATO JSON

			let json = JSON.stringify(candidato);

			await api.post("/candidato", json);
			setUserName(candidato.nome);
			showSuccess("Usuário alterado com sucesso");
			history.push("/oportunidades");
		} catch (error) {
			console.log(`${error.message}`);
			showError("Erro ao editar usuário. Tente novamente!");
		}
	}

	return <CandidatoForm />;
}

const mapStateToProps = (state) => {
	console.log(state);
	return { candidato: state.candidato };
};

export default connect(mapStateToProps, { fetchCandidato })(
	CandidateDetailsTeste
);
