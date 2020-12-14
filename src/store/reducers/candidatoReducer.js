const candidatoReducer = (state = {}, action) => {
	switch (action.type) {
		case "GET_CANDIDATO":
			return action.payload;
		case "CREATE_CANDIDATO":
			return action.payload;
		case "UPDATE_CANDIDATO":
			return action.payload;
		default:
			return state;
	}
};

export default candidatoReducer;
