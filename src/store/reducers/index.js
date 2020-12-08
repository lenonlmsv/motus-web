import { combineReducers } from "redux";

import authReducer from "./login-bar";
import opportunitiesReducer from "./opportunitiesReducer";

export default combineReducers({
	IsLogged: authReducer,
	opportunities: opportunitiesReducer,
});
