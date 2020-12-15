import React, { useState, useEffect } from 'react';

//CSS
import './styles/resumes-list.css'

//Alert

import { useAlert } from 'react-alert'

//Icons
import { FaDownload, FaTrash } from "react-icons/fa";
import { getResumes, deleteResume, downloadResume, sendResume } from '../../services/methods';

export default function ResumesList() {
    const [resumes, setResumes] = useState({});
    const [localResume, setLocalResume] = useState('');

    useEffect(() => {
        async function setResumesAPI() {
            const resumeList = await getResumes();
            setResumes(resumeList);
        }

        setResumesAPI()
    }, [])
    
    const alert = useAlert();

	const showError = (message) => {
        alert.show(message, {type: 'error'})
    }

    const showSuccess = (message) => {
        alert.show(message, {type: 'success'})
    }
    
    function deleteResumeAPI(hashId) {
        if (resumes.length > 1) {
            (deleteResume(hashId))
            showSuccess('Currículo apagado')
        }
        
        else {
            showError('Deve haver pelo menos um currículo salvo');
        }
    }

    const checkFileType = (fileType) => {
        const acceptedTypes = [
            //Checar tipos de arquivo aceitos
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

    async function downloadResumeAPI(hashId, filename) {
        await downloadResume(hashId, filename)
    }

    function handleResume(e) {
        //Valida o tipo do arquivo
        const file = e.target.files[0];
        const isFormat = checkFileType(file.type);
        
        if(isFormat) {
            //Enviar para o backend
            document.querySelector('div.input-flex.input-block').classList.remove('input-error');           
            document.querySelector('div.input-flex.input-block label span').classList.remove('text-error');
            //document.querySelector('div.file-details').classList.remove('display-none')
            setLocalResume(file);
            sendResume(file)
            showSuccess('Currículo salvo')
        }
        
        else {
            //Erro no arquivo
            document.querySelector('div.input-flex.input-block').classList.add('input-error');
            document.querySelector('div.input-flex.input-block label span').classList.add('text-error');
            //document.querySelector('div.file-details').classList.add('display-none')   
        }

    }

    const downloadLocalResume = () => {
        let a = document.createElement('a')
        a.style = 'display:none';
        a.download = localResume.name;
        const resumeURL = window.URL.createObjectURL(localResume);
        a.href = resumeURL;
        a.click()
    }

    return (
        <div id='resumes'>
            <div className="input-flex input-block">
                <label 
                    htmlFor='resume'
                    className=''>
                        <strong>Envie seu currículo</strong>
                        <span>
                            Formatos .doc, .docx ou .pdf
                        </span>
                    
                </label>

                <input 
                    id="resume"
                    type='file'
                    className='display-none'
                    onChange={handleResume}/>
            </div>

            {Object.keys(resumes).map((key) => {
                    return (
                        <div key={resumes.key} className="file-list">
                            <FaTrash 
                                color={'red'} 
                                onClick={() => {
                                    deleteResumeAPI(resumes[key].hashId)}}/>

                            <FaDownload 
                                color={'blue'} 
                                onClick={() => downloadResumeAPI(resumes[key].hashId, resumes[key].nomeArquivo)}/>

                            <p>{resumes[key].nomeArquivo}</p>
                        </div>
                    )
            })}
            
            {/* {localResume !== '' ? 
                (<div id='local-resumes'className="file-list">
                    <FaTrash color={'red'} onClick={() => {setLocalResume('')}}/>
                    <FaDownload color={'blue'} onClick={downloadLocalResume}/>
                    <p>{localResume.name}</p>
                </div>) :

                (<p></p>)
            } */}

        </div>
    )
}