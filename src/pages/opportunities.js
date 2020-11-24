import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

//Components
import BackgroundTitle from "../components/background-title/background-title";
import OpportunitiesCard from "../components/OpportunitiesCard";

//CSS
import "../styles/opportunities.css";

//Icons
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

function Opportunities() {
	return (
		<div id="page-opportunities">
			<BackgroundTitle
				title={"Junte-se a nós!"}
				description={
					"A história da Sys Manager é construída com a contribuição de uma equipe talentosa empenhada em sempre entregar a melhor solução para os clientes."
				}
			/>

			<OpportunitiesCard />
			<OpportunitiesCard />
			<OpportunitiesCard />
			<OpportunitiesCard />
			<OpportunitiesCard />
			<OpportunitiesCard />
		</div>
	);
}

export default Opportunities;
