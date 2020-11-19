import React from 'react';

function VideoRecorderBlock() {
    var cron;
    var tempo;

    (function() {
        'use strict';
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // access the web cam
            navigator.mediaDevices.getUserMedia({audio: true, video: {facingMode: 'user'}})     
            
            .then(function(stream) {
                //document.querySelector('buttonRecord').css('display', '');
                var video = document.querySelector('video');
                video.id = 'videoN1';
                video.srcObject = stream;
                video.muted = true;
                video.setAttribute('style', 'width:100%');
                video.setAttribute('controls','false');
                //video.addClass('hide-controls'); 
                video.setAttribute('playsinline', true);
                video.setAttribute('controls', false);
                video.onloadedmetadata = function(e) {
                video.play();
            }; 
        }) 

        .catch(function(error) {
            console.log('Não foi possível acesso a camera. Error: ' + error.name + ': ' + error.message);
        });

    }
    }) ();

    document.querySelector(document).ready(function() {
        var record = document.querySelector('.record');
        var stop = document.querySelector('.stop');
        var download = document.querySelector('.download');

        record.href = "#videoN1";
        stop.href = "#videoN1";
        download.href = "#videoN1";

        //Start Record
        record.onclick = function() {
            document.querySelector('#base64String').value('');
            var chunks = [];
            var videoBlobURL = '';
            //$('#videoN1').css('display', '');
            //$('.video').css('display', 'none');
            //$('#"+Lnk_Gravar.Id+"').css('display', 'none');
            //$('#"+Lnk_Parar.Id+"').css('display', '');
            //$('#"+Lnk_Download.Id+"').css('display', 'none');
            //$('#"+Lnk_Enviar.Id+"').css('display', 'none');

            start();

            navigator.mediaDevices.getUserMedia({audio: true; video: {facingMode: 'user'}})
            .then(function(stream) {
                let chunks = [];
            }
            )
        }

        )

    return (
        <div id="recorder-block">
            <video class='video' autoPlay muted></video>

            <button id="buttonRecord" className="record">Gravar</button>
            <button id="buttonStop" className="stop">Parar</button>
            <button id="buttonDownload" className="download">Download</button>
            <button id="buttonSend">Enviar</button>

            <input id="base64String" className="input"/>
            <input id="mimeType" className="input"/>
        </div>
    )
}

export default VideoRecorderBlock;