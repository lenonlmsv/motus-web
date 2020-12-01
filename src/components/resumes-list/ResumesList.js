import React, { useState, useEffect } from 'react';

//Icons
import { FaDownload, FaTrash } from "react-icons/fa";
import { getResumes, deleteResume } from '../../services/methods';

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
                        <div className="file-details">
                            <FaTrash color={'red'} onClick={() => {deleteResume(resumes[key].hashId)}}/>
                            <FaDownload color={'blue'} />
                            <p>{resumes[key].nomeArquivo}</p>
                        </div>
                    )
                })}
        </div>
    )
}