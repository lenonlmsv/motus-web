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

	const history = useHistory();
	const params = useParams();

	useEffect(() => {
		try {
			props.fetchCandidato();
		} catch (error) {
			console.log(error);
		}
	}, []);

	return <CandidatoForm />;
}

const mapStateToProps = (state) => {
	console.log(state);
	return { candidato: state.candidato };
};

export default connect(mapStateToProps, { fetchCandidato })(
	CandidateDetailsTeste
);
