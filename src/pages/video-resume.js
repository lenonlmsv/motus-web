import React, { useState } from 'react';
import {Link} from 'react-router-dom';

//Youtube dependencie
import Youtube from 'react-youtube'

//CSS
import '../styles/video-resume.css'

//Icons 
import { FaExclamation }from 'react-icons/fa';

//Components
import BackgroundTitle from '../components/background-title/background-title';

function VideoResume() {
    const errorMessage = 'Os formatos aceitos são .doc, .docx e .pdf';

    const [error, setError] = useState(errorMessage);
    const [showError, setShowError] = useState('hide-error')

    const checkFileType = (fileType) => {
        const acceptedTypes = [
            {name:'application/msword', type:' .doc'},
            {name:'application/vnd.openxmlformats-officedocument.wordprocessingml.document', type:' .docx'},
            {name:'application/pdf', type:' .pdf'}
        ]
        
        const isValid = acceptedTypes.find(type => type.name == fileType);

        if(isValid !== undefined) {
            return true;
        }

        else {
            return false;
        }
   }

    const handleVideoResume = (event) => {
        const fileTypeName = event.target.files[0].type;
        const isFormat = checkFileType(fileTypeName);
        
        if(isFormat) {
            setShowError('hide-error');
            //Enviar para o backend
        }
        else {
            setShowError('error-div')
        }
    }   

    return (
        <div id="page-video-resume">
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
                            Enviar vídeo
                        </label>

                        <input
                            id="video-resume" 
                            type="file" 
                            style={{display: "none", cursor: "pointer"}}
                            onChange={handleVideoResume}
                            />
                        
                        <Link to={'gravar-video'} className="button button-primary">
                            Gravar Vídeo
                        </Link>
                    </div>
                    <div className={showError}>
                        <FaExclamation/>{error}
                    </div>
                </div>
            </div>
        </div>    
    )
}

export default VideoResume;