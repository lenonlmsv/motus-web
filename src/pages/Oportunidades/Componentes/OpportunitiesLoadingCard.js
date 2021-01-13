import React from "react";

//Images
import { imageLoading } from "../../../images/images";

const OpportunitiesLoadingCard = () => {
	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<img alt="Carregando" src={imageLoading} />;
		</div>
	);
};

export default OpportunitiesLoadingCard;
