import React, { useState, useEffect } from "react";

import OpportunitiesCard from "./OpportunitiesCard";
import api from "../../services/api";
import OpportunitiesEmpty from "./OpportunitiesEmpty";
import OpportunitiesLoadingCard from "./OpportunitiesLoadingCard";

const OpportunitiesList = ({ opportunities, loading }) => {
	/*const [opportunities, setOpportunities] = useState([]);
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
*/

	console.log("Na lista de oportunidades: " + opportunities);
	console.log("Na lsita de opp, valor loading: " + loading);
	return loading ? (
		<OpportunitiesLoadingCard />
	) : opportunities !== "undefined" && opportunities.length > 0 ? (
		opportunities.map((array) => {
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
		})
	) : loading ? (
		<OpportunitiesLoadingCard />
	) : (
		<OpportunitiesEmpty />
	);
};

export default OpportunitiesList;
