import { createStore } from "redux";
import { combineReducers } from "redux";

//Auth
import { getUserName, isAuthenticated, login, logout } from "../services/auth";

const ISLOGGED = {
	Auth: isAuthenticated(),
	userName: getUserName(),
};

function authReducer(state = isAuthenticated(), action) {
	if (action.type === "LOGOUT") {
		logout();
		return false;
	} else if (action.type === "LOGIN") {
		return true;
	}

	return state;
}

//const IsLogged = createStore(reducer);

export default combineReducers({
	IsLogged: authReducer,
});
