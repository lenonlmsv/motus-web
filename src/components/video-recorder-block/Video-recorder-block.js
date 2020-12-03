import React, { useEffect, useState } from 'react';

//Router
import { useHistory, useParams } from 'react-router-dom';

//Icons
import { FaDownload, FaStop, FaRecordVinyl, FaShare} from 'react-icons/fa';

function VideoRecorderBlock(props) {
    useEffect(() => setRecord())

    //Params
    const params = useParams()

    //States
    const [isCameraAllowed, setIsCameraAllowed] = useState(false);

    //History
    const history = useHistory();

    let cron;
    let tempo = props.time; //Tempo limite de gravação
    let chunks = [];
    let videoBlobURL = '';
    let streamVar;
    let mediaRecorder;
        
    function setRecord() {
        'use strict';
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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
                video.onloadedmetadata = function(e) {
                    video.play();
                    triggerItens();
                };
                setIsCameraAllowed(true)
            })

            .catch(function(error) {
            console.log('Não foi possível acesso a câmera. Error: ' + error.name + ': ' + error.message);
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
            hideButtons(['#buttonRecord', '#buttonDownload', '#buttonSend']);
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
            showButtons(['#buttonRecord', '#buttonDownload', '#buttonSend'])
        }
        
        mediaRecorder.onstop = function(e) {
            document.querySelector('input#mimeType').value = mediaRecorder.mimeType;
            const blob = new Blob(chunks, { 'type' : 'octet-stream' }); //mediaRecorder.mimeType });
            chunks = [];
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
                sendOnClick(reader.result);
            }

            showVideoRecorded(videoBlobURL);
        }
    };

    const stopStreaming = (vElement) => {
        const stream = vElement.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(function(track) {
            track.stop();
        });

        vElement.srcObject = null;
    }

    const downloadOnClick = (url) => {
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display:none';
        a.href = url;
        a.download = 'videocurriculo.webm';
        a.click();
    }
    
    const sendOnClick = (b64File) => {
        const base64 = b64File.replace('data:octet-stream;base64,', '');

        let video = document.querySelector('video.videoStream');
        stopStreaming(video)
        
        history.push('/oportunidades/:id')
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
        ids.map(id => {
            ids == '' ? console.log('Argumento necessário') :
            document.querySelector(id).classList.remove('displayNone');
        })
    }

    const hideButtons = (ids) => {
        ids.map(id => {
            ids == '' ? console.log('Argumento necessário') :
            document.querySelector(id).classList.add('displayNone');
        })
    }

    const showVideoRecorded = (media) => {
        document.querySelector('video.videoStream').classList.add('displayNone');
        let video = document.querySelector('#video-recorded');
        video.classList.remove('displayNone');
        video.src = media;
    }

    const hidevideoRecorded = () => {
        document.querySelector('video.videoStream').classList.remove('displayNone');
        document.querySelector('#video-recorded').classList.add('displayNone');
    }   

    return (
        <div id="recorder-block">
            <video className='videoStream' autoPlay muted></video>
            <video id="video-recorded" muted="false" className='displayNone' controls="true"></video>
            
            <div id="timerContainer" className="displayFlex">
                <p className="timer"></p>
            </div>
            
            {
                isCameraAllowed &&
                    <div> 
                        <div className="div-buttons displayFlex">
                            <button id="buttonRecord" className="button button-secondary">
                                <FaRecordVinyl/>
                                Gravar
                            </button>

                            <button id="buttonStop" className="button button-secondary displayNone">
                                <FaStop/>
                                Parar
                            </button>

                            <button id="buttonDownload" className="button button-secondary displayNone">
                                <FaDownload/>
                                Baixar
                            </button>
                            
                            <button id="buttonSend"className="button button-primary displayNone">
                                <FaShare/>
                                Enviar
                            </button>
                        </div>

                        <input id="base64String" className="input hideItens"/>
                        <input id="mimeType" className="input hideItens"/>

                    </div>
            }
                        <div id="back-button">
                                <button onClick={() => {history.push(`/oportunidades/${params.id}`)}} className="button button-secondary">
                                    Voltar
                                </button>
                        </div>
        </div>
    )
}

export default VideoRecorderBlock;