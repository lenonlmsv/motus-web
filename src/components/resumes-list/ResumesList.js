import React, { useState, useEffect } from 'react';

//Alert 
import Alert from '../Alert'
import api from '../../services/api'

//CSS
import './styles/resumes-list.css'

//Icons
import { FaDownload, FaTrash } from "react-icons/fa";
import { getResumes, deleteResume, downloadResume } from '../../services/methods';

export default function ResumesList() {
    const [resumes, setResumes] = useState({});

    useEffect(() => {
        async function setResumesAPI() {
            const resumeList = await getResumes();
            setResumes(resumeList);
        }

        setResumesAPI()
    },[])

    return (
        <div id='resumes'>
            {Object.keys(resumes).map((key) => {
                    return (
                        <div className="file-list">
                            <FaTrash 
                                color={'red'} 
                                onClick={() => {
                                    deleteResume(resumes[key].hashId)}}/>

                            <FaDownload 
                                color={'blue'} 
                                onClick={() => downloadResume(resumes[key].hashId, resumes[key].nomeArquivo)}/>

                            <p>{resumes[key].nomeArquivo}</p>
                        </div>
                    )
                })}
        </div>
    )
}