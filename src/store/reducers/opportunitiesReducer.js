const opportunitiesReducer = (state = [], action) => {
	switch (action.type) {
		case "GET_OPPORTUNITIES":
			console.log("chamou api");
			return action.payload;
		default:
			return state;
	}
};

export default opportunitiesReducer;
