import React, { useEffect, useState } from "react";

//React Camera
import VideoRecorderBlock from "../components/video-recorder-block/video-recorder-block";

//Router dom
import { useParams } from "react-router-dom";

//CSS
import "../styles/video-recorder.css";

//Components
import BackgroundTitle from "../components/background-title/background-title";

function VideoRecord() {
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
			<div id="page-video-recorder">
				<BackgroundTitle
					title="Gravar vídeo currículo"
					description={`Você terá ${timeSeconds.toMMSS()} minutos para gravar seu novo vídeo currículo`}
				/>

				<div id="div-recoder">
					<VideoRecorderBlock time={timeSeconds} />
				</div>
			</div>
		);
	} else {
		//If will be used to record video answers
		//api.get('') Pegar dados da api

		const timeSeconds = "90";

		return (
			<div id="page-video-recorder">
				<BackgroundTitle
					title="Gravar vídeo"
					description={`Você terá até ${timeSeconds.toMMSS()} para responder esta pergunta`}
				/>

				<div id="div-recoder">
					<VideoRecorderBlock time={timeSeconds} />
				</div>
			</div>
		);
	}
}

export default VideoRecord;
