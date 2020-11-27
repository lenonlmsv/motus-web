import React, { useState, useEffect } from "react";

import OpportunitiesCard from "./OpportunitiesCard";
import api from "../../services/api";

const OpportunitiesList = () => {
	const [opportunities, setOpportunities] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const response = await api.get("/oportunidade");
				setOpportunities(response.data.responseData);
				setLoading(false);
				console.log("Dentro do fetch");
				console.log("valor loading: " + loading);
				console.log(opportunities.responseData);
			} catch (e) {
				console.log(e);
			}
		};

		fetchPosts();
	}, []);

	console.log("Oportunidade: ");
	console.log(opportunities);

	return opportunities.map((array) => {
		return (
			<div key={array.id}>
				<OpportunitiesCard
					jobName={array.titulo}
					jobDescription={array.descricaoVaga}
					workTime={array.horarioTrabalho}
					habilities={array.requisitoDesejavel}
				/>
			</div>
		);
	});
};

export default OpportunitiesList;
