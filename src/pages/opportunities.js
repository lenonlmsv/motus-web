import React from "react";

//Components
import BackgroundTitle from "../components/background-title/Background-title";
import OpportunitiesCard from "../components/opportunities/OpportunitiesCard";

//CSS
import "../styles/opportunities.css";


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
