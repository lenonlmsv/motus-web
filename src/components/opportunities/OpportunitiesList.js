import React, { useState, useEffect } from "react";

import OpportunitiesCard from "./OpportunitiesCard";
import api from "../../services/api";

const OpportunitiesList = () => {
	const [opportunities, setOpportunities] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchOpportunities = async () => {
			setLoading(true);
			try {
				const response = await api.get("/oportunidade");
				setOpportunities(response.data.responseData);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		};

		fetchOpportunities();
	}, []);

	return opportunities.map((array) => {
		return (
			<div key={array.id}>
				<OpportunitiesCard
					jobId={array.id}
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
