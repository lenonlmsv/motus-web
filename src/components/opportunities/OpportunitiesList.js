import React from "react";

import OpportunitiesCard from "./OpportunitiesCard";

const OpportunitiesList = ({ opportunities, loading }) => {
	return opportunities.map((array) => {
		return (
			<div key={array.id}>
				<OpportunitiesCard
					jobName={array.name}
					jobDescription={array.body}
				/>
			</div>
		);
	});
	//console.log(props);
	//return <div></div>;
};

export default OpportunitiesList;
