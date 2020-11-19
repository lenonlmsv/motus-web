import React, {useState} from 'react';

//React Camera

//Router dom
import {useParams} from 'react-router-dom'

//CSS
import '../styles/video-recorder.css';

//Components
import BackgroundTitle from '../components/background-title/background-title';

function VideoRecord() {
    const params = useParams();

    String.prototype.toMMSS = function () {
        var sec_num = parseInt(this, 10); // don't forget the second param
        var minutes = Math.floor((sec_num) / 60);
        var seconds = sec_num - (minutes * 60);
    
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return minutes+':'+seconds;
    }      
    
    //Camera functions 
    const [cameraState, setcameraState] = useState();


    if (params.id === 'resume') {
        //If this screens will be used to record video resume
        const timeSeconds = "300"; //Tempo de gravação

        return (
            <div id="page-video-recorder">
                <BackgroundTitle 
                    title="Gravar vídeo currículo"
                    description={`você terá ${timeSeconds.toMMSS()} minutos para gravar sua resposta em vídeo`}/>

                <div id="div-recoder">
                    y
                </div>
            </div>
        )
    }

    else {
        //If will be used to record video answers
        //api.get('') Pegar dados da api
        return (
            <div id="page-video-recorder">
                <BackgroundTitle 
                    title="Gravar vídeo"/>
            </div>
        )
    }

}

export default VideoRecord;