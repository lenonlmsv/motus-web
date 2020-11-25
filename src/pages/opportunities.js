import React from "react";

//Components
import BackgroundTitle from "../components/background-title/Background-title";
import OpportunitiesCard from "../components/opportunities/OpportunitiesCard";
import OpportunitiesList from "../components/opportunities/OpportunitiesList";

//CSS
import "../styles/opportunities.css";

function Opportunities() {
	const arrayTest = [1, 2, 3];
	return (
		<div id="page-opportunities" className="page-position">
			<BackgroundTitle
				title={"Junte-se a nós!"}
				description={
					"A história da Sys Manager é construída com a contribuição de uma equipe talentosa empenhada em sempre entregar a melhor solução para os clientes."
				}
			/>

			<OpportunitiesList id={arrayTest} />

			{/*<OpportunitiesCard
				jobType="Estagiario"
				jobDescription="Descrição teste"
				workTime="Das 8 as 20"
				habilities="Ser top que nem o Lenon no React"
			/>*/}
		</div>
	);
}

export default Opportunities;
