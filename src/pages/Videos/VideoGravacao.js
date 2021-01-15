import React from "react";

//React Camera
import VideoComponenteGravacao from "./VideoComponenteGravacao";

//Router dom
import { useParams } from "react-router-dom";

//CSS
import "./Styles/VideoGravacao.css";

//Components
import TituloPagina from "../ComponentesGlobais/TituloPagina/TituloPagina";

function VideoGravacao(props) {
	const checkState = props.location.state;
	let questionProps;
	if (checkState !== undefined) {
		questionProps = {
			time: props.location.state.timeToLink.toString(),
			question: props.location.state.questionToLink,
			id: props.location.state.idToLink,
		};
	} else {
		questionProps = {
			time: "",
			question: "",
			id: "",
		};
	}

	const params = useParams();

	String.prototype.toMMSS = function () {
		var sec_num = parseInt(this, 10);
		var minutes = Math.floor(sec_num / 60);
		var seconds = sec_num - minutes * 60;
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		return minutes + ":" + seconds;
	};

	if (params.id === "video-curriculo") {
		//If this screens will be used to record video resume
		const timeSeconds = "300"; //Tempo de gravação para vídeo currículo

		return (
			<div id="page-video-recorder" className="page-position">
				<TituloPagina
					title="Gravar vídeo currículo"
					description={`Você terá ${timeSeconds.toMMSS()} minutos para gravar seu novo vídeo currículo`}
				/>

				<div id="div-recoder">
					<VideoComponenteGravacao time={timeSeconds} returnTo={""} />
				</div>
			</div>
		);
	} else {
		//If will be used to record video answers
		//api.get('') Pegar dados da api

		const timeSeconds = questionProps.time; //Tempo de resposta da pergunta
		const timeFormat = timeSeconds.toMMSS();

		return (
			<div id="page-video-recorder" className="page-position">
				<TituloPagina
					title="Gravar vídeo"
					description={`Você terá até ${timeFormat} para responder esta pergunta`}
				/>

				<div id="div-recoder">
					<VideoComponenteGravacao
						time={timeSeconds}
						returnTo={params.id}
						questionId={questionProps.id}
						questionDescription={questionProps.question}
					/>
				</div>
			</div>
		);
	}
}

export default VideoGravacao;
