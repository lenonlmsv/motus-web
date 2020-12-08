//Auth
import { getUserName, isAuthenticated, logout } from "../../services/auth";

const ISLOGGED = {
	isLogged: isAuthenticated(),
	userName: getUserName(),
};

export default function authReducer(state = isAuthenticated(), action) {
	if (action.type === "LOGOUT") {
		logout();
		return false;
	} else if (action.type === "LOGIN") {
		return true;
	}

	return state;
}
