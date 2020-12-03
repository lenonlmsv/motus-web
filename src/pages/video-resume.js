import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";


import api from '../services/api'


//Youtube dependencie
import Youtube from "react-youtube";

//CSS
import "../styles/video-resume.css";

//Icons
import { FaExclamation } from "react-icons/fa";

//Components
import BackgroundTitle from "../components/background-title/Background-title";

//Methods
import {sendVideoResume} from '../services/methods'
import { useAlert } from "react-alert";

function VideoResume() {
    //Alert
    const alert = useAlert();

    function showSuccess(m) {
        alert.show(m, {type:'success'})
    }

    function showErrorMessage(m) {
        alert.show(m, {type: 'error'})
    }

    const [error, setError] = useState('');
    const [showError, setShowError] = useState('hide-error')
    const [resumeFile, setResumeFile] = useState('')

    const checkFileType = (fileType) => {
        const acceptedTypes = [
            //Checar tipos de arquivo aceitos
            {name:'video/mp4', type:' .mp4'},
            {name:'video/webm', type:' .webm'}
        ]
        
        const isValid = acceptedTypes.find(type => type.name == fileType);

        if(isValid !== undefined) {
            return true;
        }

        else {
            //Mostra os formatos em mensagem na tela
            const formats = acceptedTypes.map(format => {
                return (format.type);
            })

            setError(`Os formatos aceitos são ${formats}`)
            return false;
        }
    }
  
    const history = useHistory();

    async function submitResume() {
        const response = await sendVideoResume(resumeFile);
        if(response.status == 'error'){
            console.log(response)
            showErrorMessage(response.message)
            return
        }
        
        showSuccess('Video enviado com sucesso!')
        history.push('/oportunidades');
    }

    const handleVideoResume = (event) => {
        const fileTypeName = event.target.files[0].type;
        const isFormat = checkFileType(fileTypeName);
                
        if(isFormat) {
            setShowError('hide-error');
            setResumeFile(event.target.files[0]);
        }
        else {
            setShowError('error-div');
            setResumeFile('')
        }
    }   

    return (
        <div id="page-video-resume" className="page-position">
            <BackgroundTitle 
                title={'Envie seu vídeo currículo'}
                description={' história da Sys Manager é construída com a contribuição de uma equipe talentosa empenhada em sempre entregar a melhor solução para os clientes.'}/>
            
            <div className="page-video-content">
                <div className="video-marketing">
                    <Youtube 
                        videoId={'4WA8V2FEgDA'}
                        width={'100%'}
                        className="video-view"/>             
                </div>

                <div className="video-description">
                    <h1>
                        Vídeo currículo
                    </h1>

                    <p>
                        Você já ouviu falar no vídeo currículo?  A Sys Manager está recrutando profissionais desta forma. Veja como você pode enviar o seu!
                    </p>

                    <p>
                        Você pode utilizar a câmera traseira do seu celular na horizontal ou webcam clicando na opção abaixo. Escreva um roteiro com informações pessoais e experiências profissionais detalhando brevemente atividades e conhecimentos. Fale de sua formação acadêmica, certificações e quais idiomas domina.
                    </p>

                    <p>
                        Dois a três minutos de vídeo estará ótimo! Você pode gravar, verificar como ficou e ao final encaminhar para gente!
                    </p>

                    <p>
                        O recrutador quer te conhecer melhor. Vamos lá?
                    </p>

                    <div className="video-buttons">
                        <label htmlFor="video-resume" className="button button-secondary">
                            Selecionar vídeo
                        </label>

                        <input
                            id="video-resume" 
                            type="file" 
                            style={{display: "none", cursor: "pointer"}}
                            onChange={handleVideoResume}
                            />
                        
                        <Link to={'/gravar-video/video-curriculo'} className="button button-primary">
                            Gravar Vídeo
                        </Link>

                        {resumeFile &&
                            <button
                            onClick={() => submitResume()} 
                            className='button button-secondary send-button'>Enviar</button>
                        }
                    </div>
                    
                    {resumeFile && 
                        <div id="selected-file">
                            <span 
                                style={{color: 'rgba(0,0,0,0.5'}}>
                                Arquivo selecionado:</span>
                            <p 
                                style={{alignSelf:'left'}}>
                                {resumeFile.name}</p>
                        </div>
                    }

                    <div className={showError}>
                        <FaExclamation/>{error}
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default VideoResume;
