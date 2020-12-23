import React from "react";

//CSS
import "./styles/opportunities-component.css";

import noOpportunities from '../../images/no-opportunities.svg'

const OpportunitiesEmpty = () => {
	return (
		<div id='no-opportunities'>
			<p className="no-opportunities">Sem oportunidades no momento...</p>
			<img src={noOpportunities} alt="Sem oportunidades no momento"/>
		</div>
	);
};

export default OpportunitiesEmpty;
