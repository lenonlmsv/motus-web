const opportunitiesReducer = (state = [], action) => {
	switch (action.type) {
		case "GET_OPPORTUNITIES":
			console.log("chamou api");
			return action.payload;
		case "GET_OPPORTUNITY":
			/*const estado = state.find((opport) => opport.id === action.payload);
			console.log(estado);
			if (estado === "undefined") {
				//state = [opportunitiesEmpty()];
				return state;
      } else return estado;*/
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
