import { combineReducers } from "redux";

//Reducers
import authReducer from './login-bar'
import setUserName from './set-user-name'

export default combineReducers({
	IsLogged: authReducer,
	UserName: setUserName, 
});
