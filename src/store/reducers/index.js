import { combineReducers } from "redux";

<<<<<<< HEAD
//Reducers
import authReducer from './login-bar'
import setUserName from './set-user-name'

export default combineReducers({
	IsLogged: authReducer,
	UserName: setUserName, 
=======
import authReducer from "./login-bar";
import opportunitiesReducer from "./opportunitiesReducer";

export default combineReducers({
	IsLogged: authReducer,
	opportunities: opportunitiesReducer,
>>>>>>> 8f7bef477bd6eafaff54100943b373bd7cc1616b
});
