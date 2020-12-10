const candidaturaReducer = (state = [], action) => {
	switch (action.type) {
		/*case "CHECK_CANDIDATURA":
			return action.payload.candidaturas.find((candidatura) => {
				if (candidatura.vagaId === action.payload.idOpportunity)
					return true;
			})
				? true
				: false;
		case "CREATE_CANDIDATURA":
			console.log("candidatura");
			console.log(action.payload);
			return typeof action.payload === "object" && action.payload !== null
				? true
				: false;*/
		case "GET_CANDIDATURA":
			console.log("NO REDUCER");
			console.log(action.payload);
			return action.payload;
		default:
			return state;
	}
};
/*
payload: {
  candidaturas: response.data.responseData,
  idOpportunity: parseInt(idOpportunity),
}*/

export default candidaturaReducer;
