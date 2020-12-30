import React, { useState, useEffect } from 'react';

//Router dom
import {Link} from "react-router-dom";

//CSS
import './styles/resumes-list.css'

//Alert
import { useAlert } from 'react-alert'

//Functions
import {checkFileTypeFiles} from '../../services/functions'

//Icons
import { FaDownload, FaTrash } from "react-icons/fa";
import { getResumes, deleteResume, downloadFile, sendResume } from '../../services/methods';
import {imageLoading} from '../../images/images'

export default function ResumesList() {
    const [resumes, setResumes] = useState({});
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function setResumesAPI() {
            const resumeList = await getResumes();
            setResumes(resumeList);
        }

        setResumesAPI()
    }, [loading])
    
    const alert = useAlert();

	const showError = (message) => {
        alert.show(message, {type: 'error'})
    }

    const showSuccess = (message) => {
        alert.show(message, {type: 'success'})
    }
    
    async function deleteResumeAPI(hashId) {
        if (resumes.length > 1) {
            setLoading(true)
            await deleteResume(hashId)
            //setResumes({...resumes})
            setLoading(false)
            showSuccess('Currículo apagado');
        }
        
        else {
            showError('Deve haver pelo menos um currículo salvo');
        }
    }

    async function downloadResumeAPI(hashId, filename) {
        await downloadFile(hashId, filename)
    }

    async function handleResume(e) {
        //Valida o tipo do arquivo
        const file = e.target.files[0];
        const isFormat = checkFileTypeFiles(file.type);
        
        if(isFormat.valid) {
            //Enviar para o backend
            document.querySelector('div.input-flex.input-block').classList.remove('input-error');           
            document.querySelector('div.input-flex.input-block label span').classList.remove('text-error');
            //document.querySelector('div.file-details').classList.remove('display-none')
            if(resumes.length < 5) {
                setLoading(true)
                const response = await sendResume(file)
                response === null && (
                    showError(`Erro interno`)
                )
                //setResumes({...resumes})
                setLoading(false)
                showSuccess('Currículo salvo')
            }

            else {
                showError('Você pode enviar somente 5 arquivos!')
            }
            
        }
        
        else {
            //Erro no arquivo
            document.querySelector('div.input-flex.input-block').classList.add('input-error');
            document.querySelector('div.input-flex.input-block label span').classList.add('text-error');
            //document.querySelector('div.file-details').classList.add('display-none')   
            showError(`Erro: ${isFormat.acceptedFormats}`)
        }

    }

    return (
        <div id='resumes'>
            <div className="input-flex input-block">
                <label 
                    htmlFor='resume'
                    className="label-span">
                        <p style={{textDecoration:'underline'}}>Envie currículo</p>
                        {/* <Link className="link-underline">Envie currículo</Link> */}
                        <span>
                            (Envie seu currículo nos formatos .doc, .docx ou .pdf)
                        </span>
                    
                </label>

                <input 
                    id="resume"
                    type='file'
                    className='display-none'
                    onChange={handleResume}/>
            </div>

            {
                !loading ?
                (
                    Object.keys(resumes).map((key) => {
                        return (
                            <div key={resumes.key} className="file-list">
                                <FaTrash 
                                    color={'grey'} 
                                    onClick={() => {
                                    deleteResumeAPI(resumes[key].hashId)}}/>
    
                                <FaDownload 
                                    color={'var(--color-font-primary)'} 
                                    onClick={() => 
                                    downloadResumeAPI(resumes[key].hashId, 
                                    resumes[key].nomeArquivo)}/>
    
                                <p>{resumes[key].nomeArquivo}</p>
                            </div>
                        )
                    })
                )
                :
                (
                    <img style={{width:'40px', margin:'20px'}} src={imageLoading}/>
                )
            }

        </div>
    )
}