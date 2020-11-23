import React from 'react';

function VideoRecorderBlock() {
    

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