import { combineReducers } from "redux";

import authReducer from './login-bar'

export default combineReducers({
	IsLogged: authReducer,
});
