import React from "react";

//Router dom
import ReactDOM from "react-dom";

//Provider
import { Provider } from "react-redux";

import App from "./app";

//CSS
import "./styles/global.css";

//Alert provider
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import reducers from "./store";

//Reducer provider
//const store = createStore(reducers, applyMiddleware(thunk));
import store from './store'

const options = {
	position: positions.TOP_CENTER,
	timeout: 3000,
	offset: "10px",
	transition: transitions.SCALE,
};


ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<AlertProvider template={AlertTemplate} {...options}>
				<App />
			</AlertProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
