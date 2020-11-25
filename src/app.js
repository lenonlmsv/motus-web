import React from "react";

//Routes
import Routes from "./routes";

//Components
<<<<<<< HEAD
//import PageHeader from "./components/page-header/Page-header";
//import PageFooter from "./components/page-footer/Page-footer";
=======
import PageHeader from "./components/page-header/page-header";
import PageFooter from "./components/page-footer/page-footer";
>>>>>>> 56fc19e3116b84adffda4774238f8b39ac61ba1e

//CSS
import "./styles/global.css";

function App() {
	return (
		<div id="page-content" className="page-content">
			{//<PageHeader />
			}
			
			<div className="router-content">
				<Routes />
			</div>

<<<<<<< HEAD
			{//<PageFooter />
			}
 		</div>
=======
			<PageFooter />
		</div>
>>>>>>> 56fc19e3116b84adffda4774238f8b39ac61ba1e
	);
}

export default App;
