import React from "react";

import OpportunitiesCard from "./OpportunitiesCard";

const OpportunitiesList = (props) => {
	return props.id.map((id) => {
		return <OpportunitiesCard />;
	});
	//console.log(props);
	//return <div></div>;
};

export default OpportunitiesList;
