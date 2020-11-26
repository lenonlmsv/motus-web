import React, { useState, useEffect } from "react";
import axios from "axios";

//Components
import BackgroundTitle from "../components/background-title/Background-title";
import OpportunitiesCard from "../components/opportunities/OpportunitiesCard";
import OpportunitiesList from "../components/opportunities/OpportunitiesList";

//CSS
import "../styles/opportunities.css";

function Opportunities() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(5);

	const arrayTest = [
		{ id: 1, jobDes: "React Dev" },
		{ id: 2, jobDes: "Mobile Dev" },
		{ id: 3, jobDes: "Web Dev" },
	];

	// TODO: Modificar pra pegar da api correta
	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			const response = await axios.get(
				"https://sysmanager-dev.outsystemscloud.com/RequisicaoVaga_Service/rest/Oportunidades"
			);
			setPosts(response.data);
			setLoading(false);
		};

		fetchPosts();
	}, []);
	console.log("Tentando pegar api");
	console.log(posts);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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

			{/*<OpportunitiesList opportunities={currentPosts} />
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
