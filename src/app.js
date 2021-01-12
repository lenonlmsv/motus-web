import React from "react";

//Routes
import Routes from "./routes";

//CSS
import "./styles/global.css";
import { isAuthenticated, logout } from "./services/auth";

function App() {
	/*window.unload(function () {
		if (isAuthenticated()) {
			logout();
		}
	});*/

	//window.addEventListener("beforeunload", function (e) {
	//var confirmationMessage = "o/";
	//(e || window.event).returnValue = confirmationMessage; //Gecko + IE
	//return confirmationMessage; //Webkit, Safari, Chrome
	//if (isAuthenticated()) {
	//	logout();
	//}
	//});
	return (
		<div id="page-content" className="page-content">
			<div className="router-content">
				<Routes />
			</div>
		</div>
	);
}

export default App;
