import React, { useState, useEffect } from "react";
import api from "../services/api";

//Components
import BackgroundTitle from "../components/background-title/Background-title";
import OpportunitiesList from "../components/opportunities/OpportunitiesList";

//CSS
import "../styles/opportunities.css";

function Opportunities() {
	const [opportunities, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(5);

	// TODO: Modificar pra pegar da api correta
	{
		/*	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			const response = await api.get("/oportunidade");
			setPosts(response.data);
			setLoading(false);
			console.log("Dentro do fetch");
			console.log("valor loading: " + loading);
			console.log(opportunities.responseData);
		};

		fetchPosts();
	}, []);
*/
	}
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	//const currentPosts = opportunities.slice(indexOfFirstPost, indexOfLastPost);

	//Muda pagina
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div id="page-opportunities" className="page-position">
			<BackgroundTitle
				title={"Junte-se a nós!"}
				description={
					"A história da Sys Manager é construída com a contribuição de uma equipe talentosa empenhada em sempre entregar a melhor solução para os clientes."
				}
			/>

			<OpportunitiesList />
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
