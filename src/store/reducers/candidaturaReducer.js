const candidaturaReducer = (state = [], action) => {
	switch (action.type) {
		case "CREATE_CANDIDATURA":
			return typeof action.payload === "object" && action.payload !== null
				? [...state, action.payload]
				: state;
		case "GET_CANDIDATURA":
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
