import React from "react";

import loadingImage from '../../images/loading.gif'

const OpportunitiesLoadingCard = () => {
	return (
		<div style={{display:'flex', justifyContent:'center'}}>
			<img alt="Carregando" src={loadingImage}/>;
		</div>
	)
}

export default OpportunitiesLoadingCard;
