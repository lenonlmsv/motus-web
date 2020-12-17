import React, {useEffect, useState} from "react";

//Router
import { Link, useHistory, useParams } from "react-router-dom";

//Icons
import { FaUpload, FaDownload, FaRecordVinyl, FaCheck } from "react-icons/fa";
import loadingImg from '../../images/loading.gif'

//Methods


//Functions
import {checkFileTypeVideos} from '../../services/functions'

//Alert
import {useAlert} from 'react-alert';

export default function Question(props) {
    const params = useParams();

    //States
    const [isSend, setIsSend] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const alert = useAlert()

    function showSucess(m) {
        alert.show(m, {type: 'success'})
    }

    function showError(m) {
        alert.show(m, {type: 'error'})
    }

    function handleSubmit(e) {
        const fileTypeName = e.target.files[0].type;
        const isFormat = checkFileTypeVideos(fileTypeName);
    
        if(isFormat.valid) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false);
                setIsSend(true)
            },3000)
            
            //CHAMAR API
            //atualizar página
            showSucess('Vídeo enviado com sucesso')
        }
        else {
            showError(`Erro: ${isFormat.acceptedFormats}`)
        }
    }

    return (
        <div id="video-questions">
            <div className="questions">
                <div className="question">
                        {props.id, props.question}{" "}
                    {
                        isSend && <FaCheck className="question-check" />
                    }
                    
                </div>

                <div className="actions">
                    <label
                        htmlFor="send-video"
                        className="send-button"
                    >
                        {
                            loading ? (<img style={{
                                width:'1rem', 
                                margin: '0 0.5rem 0 0'}}   
                                src={loadingImg}/>)
                            : 
                            <FaUpload className="send-button-icon" />
                        }
                       
                        Enviar Vídeo
                    </label>

                    <input
                        id="send-video"
                        type="file"
                        className="send-button"
                        onChange={handleSubmit}
                        style={{ display: "none" }}
                    />

                    <Link
                        to={`/gravar-video/${params.id}`}
                        className="send-button"
                    >
                        {
                            //Retornar para video/:id
                        }
                        <FaRecordVinyl className="send-button-icon" />
                        Gravar vídeo
                    </Link>

                    <button className="send-button">
                        <FaDownload className="send-button-icon" />
                        Download
                    </button>
                </div>
            </div>
        </div>
    )
}
