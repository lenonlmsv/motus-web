import React, { useEffect, useState } from "react";

//Methods
import { getCandidatures } from "../../services/methods";
import OpportunitiesLoadingCard from "../opportunities/OpportunitiesLoadingCard";
import { Link } from "react-router-dom";

function CandidatureBlock() {
	const [candidature, setCandidatures] = useState("");

	useEffect(() => {
		async function fetchCandidature() {
			const candidature = await getCandidatures();
			setCandidatures(candidature);
		}

		fetchCandidature();
	}, []);

	const getDate = (date) => {
		const days = [
			"Domingo",
			"Segunda-feira",
			"Terça-feira",
			"Quarta-feira",
			"Quinta-feira",
			"Sexta-feira",
			"Sábado",
		];
		const weekday = date.getDay();
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		return `${days[weekday]}, ${day}/${month}/${year}`;
	};

	return candidature.length === 0 ? (
		<OpportunitiesLoadingCard />
	) : candidature === false ? (
		<p style={{ display: "none" }}>Sem registros</p>
	) : (
		<div id="history-block">
			<p>Histórico de candidaturas</p>
			{candidature.map((item) => {
				let date = new Date(item.criadoEm);
				let link = `/oportunidades/${item.vagaId}`;
				return (
					<Link to={link}>
						<div className='content-div' key={item.id}>
							<span>{getDate(date)}</span>
							<p>{item.titulo}</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
}

export default CandidatureBlock;
