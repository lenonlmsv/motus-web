import React, { useEffect, useState } from 'react';

//Router
import { useHistory, useParams } from 'react-router-dom';

//Icons
import { FaDownload, FaStop, FaRecordVinyl, FaShare} from 'react-icons/fa';
import loadingImg from '../../images/loading.gif'

//Methods
import {sendVideoResume} from '../../services/methods'

//Alert
import { useAlert } from 'react-alert';

function VideoRecorderBlock(props) {
    useEffect(() => { setRecord() }, [])

    //Params
    const params = useParams();
        
    //States
    const [isCameraAllowed, setIsCameraAllowed] = useState(false);
    const [returnTo, setreturnTo] = useState(props.returnTo);
    const [loading, setLoading] = useState(false)
    
    const alert = useAlert();

    function showSuccess(m) {
        alert.show(m, {type: 'success'})
    }

    function showErrorMessage(m) {
        alert.show(m, {type: 'error'})
    }

    //History
    const history = useHistory();

    let cron;
    let tempo = props.time; //Tempo limite de gravação
    let chunks = [];
    let videoBlobURL = '';
    let streamVar;
    let mediaRecorder;
    let fileRecorded;
    
  
    function setRecord() {
        'use strict';
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {//Checa disponibilidade
        // Access the web cam
            navigator.mediaDevices.getUserMedia({audio: true, video: {facingMode: 'user'}}).then(function(stream) {
                let video = document.querySelector('video.videoStream');
                video.id = 'videoN1';
                video.srcObject = stream;
                streamVar = stream; //Exporta o valor 'stream'
                video.muted = true;
                video.setAttribute('controls','false');
                video.setAttribute('playsinline', true);
                video.setAttribute('controls', false);
                video.onloadedmetadata = function() {
                    video.play();
                    triggerItens();
                };
                setIsCameraAllowed(true);
                //Destination after record video
                props.returnTo === '' && setreturnTo('')
            })

            .catch(function(error) {
            console.log('Não foi possível acesso a câmera. Erro: ' + error.name + ': ' + error.message);
            });
        }
    };
    
    function triggerItens () {
        mediaRecorder = new MediaRecorder(
            streamVar, 
            {audioBitsPerSecond : 16000, 
            videoBitsPerSecond : 500000, 
            mimeType : 'video/webm'}
        );

        hideButtons(['#buttonDownload', '#buttonSend'])

        let record = document.querySelector('#buttonRecord');
        let stop = document.querySelector('#buttonStop');
        let download = document.querySelector('#buttonDownload');
        let send = document.querySelector("#buttonSend")

        record.href = '#videoN1';
        stop.href = '#videoN1';
        download.href = '#videoN1';
        
        //Start record
        record.onclick = function() {
            chunks = [];
            
            showButtons(['#buttonStop']);
            hideButtons(['#back-button', '#buttonRecord', '#buttonDownload', '#buttonSend']);
            hidevideoRecorded();

            startT();                
            
            navigator.mediaDevices.getUserMedia({audio: true, video: {facingMode: 'user'}})
            .then(function() {
                chunks = [];

                mediaRecorder.start();
                
                mediaRecorder.ondataavailable = function(eventoData) {
                    if(eventoData.data.size > 0) {
                        chunks.push(eventoData.data);
                    }     
                }
            })
        }
                
        //Stop record        
        stop.onclick = function() {
            mediaRecorder.stop();
            hideButtons(['#buttonStop'])
            showButtons(['#buttonRecord', '#back-button', '#buttonDownload', '#buttonSend'])
        }
        
        mediaRecorder.onstop = function(e) {
            fileRecorded = chunks[0]
            document.querySelector('input#mimeType').value = mediaRecorder.mimeType;
            const blob = new Blob(chunks, { 'type' : 'octet-stream' }); //mediaRecorder.mimeType });
            //chunks = [];
            videoBlobURL = window.URL.createObjectURL(blob);
            stopT();
            
            var reader = new FileReader();
            reader.readAsDataURL(blob); 
            reader.onloadend = function() {
                var base64data = reader.result; 
                document.querySelector('input#base64String').value = base64data;
            }
            
            //Download record
            download.onclick = () => {
                downloadOnClick(videoBlobURL);
            }
            
            //Send Record
            send.onclick = () => {
                sendOnClick(fileRecorded);
            }

            showVideoRecorded(videoBlobURL);
        }
    };

    const stopStreaming = () => {
        const videoElement = document.querySelector('video.videoStream');
        const stream = videoElement.srcObject;
        const tracks = stream.getTracks();
        
        tracks.forEach(function(track) {
            track.stop();
            track.enabled = false;
        });
        videoElement.srcObject = null;

    }

    const downloadOnClick = (url) => {
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display:none';
        a.href = url;
        a.download = 'videocurriculo.webm';
        a.click();
    }
    
    const sendOnClick = async (file) => {
        hideButtons(['#back-button']);
        if (params.id === 'video-curriculo') {
            setLoading(true)
            const response = await sendVideoResume(file);
            setLoading(false)
            if(response.status == 'error'){
                showErrorMessage(response.message);
                return
            }
            showSuccess('Vídeo currículo enviado com sucesso!');
            stopStreaming()
            history.push(returnTo)
        }

        else {
            setLoading(true)
            //Call API
            //setLoading(true)
            stopStreaming()
            showSuccess('Vídeo resposta enviado com sucesso!');
            history.push(`/oportunidades/${params.id}`)
        }
        
    }
    
    function startT(){
        //Update the count down every 1 second
        cron = setInterval(() => {timer();}, 1000);
    }

    function stopT(){
        clearInterval(cron);
        document.querySelector('p.timer').innerText = '';
    }

    function timer(){
        // Time calculations for hours, minutes and seconds
        tempo--;
        //var hours = Math.floor(tempo / (1000 * 60 * 60));
        var minutes = Math.floor((tempo % (1000 * 60 * 60))/60);
        var seconds = Math.floor((tempo % (1000 * 60 * 60)) % 60);
            
        //var h = h < 10 ? '0' + hours + ':' :  hours + ':';
        var min = minutes < 10 ? '0' + minutes + ':' :  minutes + ':';
        var sec = seconds < 10 ? '0' + seconds :  seconds;    

        document.querySelector('p.timer').innerText = min + sec//h + min + sec;

        // If the count down is over, write some text 
        if (tempo <= 0) {
            clearInterval(cron);
            document.querySelector('#buttonStop').click();
        }
    }

    //Mostrar e ocultar botões
    const showButtons = (ids) => {
        typeof ids !== 'object' && console.log('objeto inválido')
        ids.map(id => {
            ids == '' ? console.log('Argumento necessário') :
            document.querySelector(id).classList.remove('display-none');
        })
    }

    const hideButtons = (ids) => {
        typeof ids !== 'object' && console.log('objeto inválido')
        ids.map(id => {
            ids == '' ? console.log('Argumento necessário') :
            document.querySelector(id).classList.add('display-none');
        })
    }

    const showVideoRecorded = (media) => {
        document.querySelector('video.videoStream').classList.add('display-none');
        let video = document.querySelector('#video-recorded');
        video.classList.remove('display-none');
        video.src = media;
    }

    const hidevideoRecorded = () => {
        document.querySelector('video.videoStream').classList.remove('display-none');
        document.querySelector('#video-recorded').classList.add('display-none');
    }   

    return (
        <div id="recorder-block">
            {
                !isCameraAllowed && 
                 //Sem acesso à câmera
                <div id='no-opportunities'>
                    <p className="no-opportunities">Sem acesso à câmera...</p>
                </div>
            }

            {
                isCameraAllowed && 
                <div id='question'>
                    <p>{props.question}</p>
                </div>

            }
            

            <video className='videoStream' autoPlay muted></video>
            <video id="video-recorded" muted="false" className='display-none' controls="true"></video>
            
            <div id="timerContainer" className="displayFlex">
                <p className="timer"></p>
            </div>
            
            {
                isCameraAllowed && (
                    !loading && isCameraAllowed ? 
                    (<div> 
                        <div className="div-buttons displayFlex">
                            <button id="buttonRecord" className="button button-secondary">
                                <FaRecordVinyl/>
                                Gravar
                            </button>

                            <button id="buttonStop" className="button button-secondary display-none">
                                <FaStop/>
                                Parar
                            </button>

                            <button id="buttonDownload" className="button button-secondary display-none">
                                <FaDownload/>
                                Baixar
                            </button>
                            
                            <button 
                                id="buttonSend"
                                className="button button-primary display-none"
                                style={{cursor:'pointer'}}>
                                <FaShare/>
                                Enviar
                            </button>
                        </div>

                        <input id="base64String" className="input hideItens"/>
                        <input id="mimeType" className="input hideItens"/>

                    </div>)
                    :
                    (
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <img style={{
                            width:'2rem', 
                            margin: '0 0 1rem 0'}}   
                            src={loadingImg}
                            alt='Loading...'/>
                        </div>
                    )
                )
            }

            <div id="back-button">
                    <button 
                        onClick={() => {
                        stopStreaming()
                        history.push(`/oportunidades/${returnTo}`)}} 
                        className="button button-secondary">
                        Voltar
                    </button>
            </div>
        </div>
    )
}

export default VideoRecorderBlock;