import React from "react";

//CSS
import "./styles/opportunities-component.css";

import {imageEmpty} from '../../images/images'

const OpportunitiesEmpty = () => {
	return (
		<div id='no-opportunities'>
			<p className="no-opportunities">Sem oportunidades no momento...</p>
			<img src={imageEmpty} alt="Sem oportunidades no momento"/>
		</div>
	);
};

export default OpportunitiesEmpty;
