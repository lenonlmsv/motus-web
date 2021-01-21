import React from "react";

import { imageLoading } from "../../../images/images";

const BoxLoading = ({ isOpen }) => {
	return isOpen ? (
		<div className="box-loading">
			<img style={{ width: "40px", margin: "20px" }} src={imageLoading} />
			<p>Um momento...</p>
		</div>
	) : null;
};

export default BoxLoading;
