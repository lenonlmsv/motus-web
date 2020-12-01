import React, { useState, useEffect } from "react";
import api from "../services/api";

//Components
import BackgroundTitle from "../components/background-title/Background-title";
import OpportunitiesList from "../components/opportunities/OpportunitiesList";
import Pagination from "../components/Pagination";

//CSS
import "../styles/opportunities.css";

function Opportunities() {
	const [error, setError] = useState(null);
	const [opportunities, setOpportunities] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(5);

	useEffect(() => {
		const fetchOpportunities = async () => {
			setLoading(true);
			try {
				const response = await api.get("/oportunidade");
				setOpportunities(response.data.responseData);
				setLoading(false);
			} catch (e) {
				console.log(e);
				setError(e);
			}
		};

		fetchOpportunities();
	}, []);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = opportunities.slice(indexOfFirstPost, indexOfLastPost);
	//Muda pagina
	const paginate = (pageNumber) => {
		setCurrentPage(pageNumber);
	};
	console.log(opportunities);
	console.log("O error é: " + error);

	return (
		<div id="page-opportunities" className="page-position">
			<BackgroundTitle
				title={"Junte-se a nós!"}
				description={
					"A história da Sys Manager é construída com a contribuição de uma equipe talentosa empenhada em sempre entregar a melhor solução para os clientes."
				}
			/>
			{error === null ? (
				<div>
					<OpportunitiesList
						opportunities={currentPosts}
						loading={loading}
					/>
					<Pagination
						postsPerPage={postsPerPage}
						totalPosts={opportunities.length}
						paginate={paginate}
					/>
				</div>
			) : (
				<div>Erro na api</div>
			)}
			{/*<OpportunitiesList
				opportunities={opportunities}
				loading={loading}
			/>
			<Pagination
				postsPerPage={postsPerPage}
				totalPosts={posts.length}
				paginate={paginate}
			/>}
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
