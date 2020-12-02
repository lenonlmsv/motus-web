import React from "react";

//Routes
import Routes from "./routes";

//CSS
import "./styles/global.css";

function App() {
	return (
		<div id="page-content" className="page-content">	
			<div className="router-content">
				<Routes />
			</div>
 		</div>
	);
}

export default App;
