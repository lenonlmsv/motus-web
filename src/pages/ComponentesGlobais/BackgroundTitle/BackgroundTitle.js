import React, { useEffect } from "react";

//CSS
import "./Styles/BackgroundTitle.css";

function BackgroundTitle(props) {
	useEffect(() => {
		const pageTitle = props.title;
		document.querySelector("title").innerText = pageTitle;
		window.scrollTo(0, 0);
	}, [props.title]); //Executa apenas se o props.title mudar

	return (
		<div id="image-background-dotted">
			<div className="div-image-dotted">
				<strong className="div-image-content">{props.title}</strong>
			</div>
			<div className="div-description">
				<p>{props.description}</p>
			</div>
		</div>
	);
}

export default BackgroundTitle;
