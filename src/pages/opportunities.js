import React from "react";

//Components
import BackgroundTitle from "../components/background-title/background-title";
import OpportunitiesCard from "../components/Opportunities/OpportunitiesCard";

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

			<OpportunitiesCard
				jobType="Estagiario"
				jobDescription="Descrição teste"
				workTime="Das 8 as 20"
				habilities="Ser top que nem o Lenon no React"
			/>
			<OpportunitiesCard jobType="Pleno" />
			<OpportunitiesCard jobType="Senior" />
			<OpportunitiesCard />
			<OpportunitiesCard />
			<OpportunitiesCard />
		</div>
	);
}

export default Opportunities;
