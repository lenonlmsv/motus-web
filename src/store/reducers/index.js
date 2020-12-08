import { combineReducers } from "redux";

//Reducers
import authReducer from './login-bar'
import setUserName from './set-user-name'
import opportunitiesReducer from "./opportunitiesReducer";

export default combineReducers({
	IsLogged: authReducer,
	UserName: setUserName,
	opportunities: opportunitiesReducer,
});
