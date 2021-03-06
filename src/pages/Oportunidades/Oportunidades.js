import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

//Components
import TituloPagina from "../ComponentesGlobais/TituloPagina/TituloPagina";
import OpportunitiesList from "./Componentes/OpportunitiesList";
import OpportunitiesEmpty from "./Componentes/OpportunitiesEmpty";

//CSS
import "./Styles/Oportunidades.css";
import "./Styles/OportunidadesComponentes.css";
import "./Styles/Dropdown.css";

import { fetchOpportunitiesRedux } from "../../store/actions";
import { useAlert } from "react-alert";
//import Pagination from "../components/Pagination";

import Pagination from "@material-ui/lab/Pagination";

import Dropdown from "react-dropdown";
//import { Dropdown } from "semantic-ui-react";
//import "react-dropdown/style.css";

function Oportunidades(props) {
	const [opportunities, setOpportunities] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState("");
	const [cargoEscolhido] = useState("");
	const alert = useAlert();

	const totalItems = 10;

	const options = ["React", "Desenvolvedor Web", "Lider tecnico"];
	const defaultOption = options[0];

	const handleChangePage = (event, newPage) => {
		props.fetchOpportunitiesRedux(
			newPage,
			totalItems,
			search,
			cargoEscolhido,
			alert
		);
	};

	useEffect(() => {
		props.fetchOpportunitiesRedux(
			1,
			totalItems,
			search,
			cargoEscolhido,
			alert
		);
		//fetchOpportunities("");
	}, []);

	//const indexOfLastPost = currentPage * postsPerPage;
	//const indexOfFirstPost = indexOfLastPost - postsPerPage;
	//const currentPosts = opportunities.slice(indexOfFirstPost, indexOfLastPost);
	//Muda pagina
	const paginate = (pageNumber) => {
		//setCurrentPage(pageNumber);
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			props.fetchOpportunitiesRedux(1, totalItems, search, alert);
		}
	};

	const onSelect = (option) => {
		console.log(option);
		//props.fetchOpportunitiesRedux(1, totalItems, search, alert);
	};
	return (
		<div id="page-opportunities" className="page-position">
			<TituloPagina
				title={"Junte-se a nós!"}
				description={
					"A história da Sys Manager é construída com a contribuição de uma equipe talentosa empenhada em sempre entregar a melhor solução para os clientes."
				}
			/>

			<div>
				<div id="search">
					<div id="search-items">
						<Dropdown
							options={options}
							onChange={onSelect}
							value={defaultOption}
							placeholder="Select an option"
						/>

						<input
							id="search-input"
							type="text"
							value={search}
							placeholder="Pesquise aqui..."
							onChange={(e) => setSearch(e.target.value)}
							onKeyPress={handleKeyPress}
						/>
						<div>
							<button
								id="clean-field"
								className="button button-secondary"
								onClick={() => {
									setSearch("");
									props.fetchOpportunitiesRedux(
										1,
										totalItems,
										"",
										alert
									);
								}}
							>
								Limpar
							</button>

							<button
								id="search-button"
								className="button button-primary"
								onClick={() =>
									props.fetchOpportunitiesRedux(
										1,
										totalItems,
										search,
										cargoEscolhido,
										alert
									)
								}
							>
								Buscar
							</button>
						</div>
					</div>
				</div>
			</div>
			{typeof props.opportunities.responseData !== "undefined" &&
			props.opportunities.responseData.length > 0 ? (
				<div>
					<div>
						<h2 className="vagasDisp">Vagas disponíveis</h2>

						<OpportunitiesList
							//opportunities={opportunities}
							opportunities={props.opportunities.responseData}
							loading={loading}
						/>
					</div>
					{props.opportunities.totalPage > 1 ? (
						<div id="div-pagination">
							<Pagination
								count={props.opportunities.totalPage}
								shape="rounded"
								size="large"
								variant="outlined"
								//showFirstButton
								//showLastButton
								onChange={handleChangePage}
							/>
						</div>
					) : null}
				</div>
			) : (
				<OpportunitiesEmpty />
			)}
		</div>
	);
}

{
	/*
	props.opportunities.responseData !== "undefined" ? (
		<OpportunitiesList
			//opportunities={opportunities}
			opportunities={props.opportunities.responseData}
			loading={loading}
		/>
	) : (
		<div>Teste....</div>
	);*/
}

const mapStateToProps = (state) => {
	return { opportunities: state.opportunities };
};

export default connect(mapStateToProps, { fetchOpportunitiesRedux })(
	Oportunidades
);
