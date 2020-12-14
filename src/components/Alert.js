import React from "react";

import { useAlert } from "react-alert";

function Alert(message) {
	const alert = useAlert();
	return alert.show("message");
	//return alert.show(message);
}

export default Alert;
