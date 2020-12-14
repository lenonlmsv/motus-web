const opportunitiesReducer = (state = [], action) => {
	switch (action.type) {
		case "GET_OPPORTUNITIES":
			return action.payload;
		case "GET_OPPORTUNITY":
			return action.payload;
		default:
			return state;
	}
};

const opportunitiesEmpty = () => {
	return {
		id: 0,
		titulo: "",
		numeroVaga: 0,
		descricaoVaga: "",
		horarioTrabalho: "",
		requisitoDesejavel: "",
		disponivel: 1,
		identificadorVaga: "",
	};
};

export default opportunitiesReducer;
