import React, {useEffect, useState} from "react";

//Router
import { Link, useHistory, useParams } from "react-router-dom";

//Methods
import {getQuestions} from '../../services/methods'

//Functions
import {checkFileTypeVideos} from '../../services/functions'

//Alert
import {useAlert} from 'react-alert';

//Icons
import { FaUpload, FaDownload, FaRecordVinyl, FaCheck } from "react-icons/fa";
import loadingImg from '../../images/loading.gif'

export default function QuestionsBlock() {
    const params = useParams();

    //const initial = {id: props.id, isLoading: false}

    //States
    const [questions, setQuestions] = useState('')
    const [isCompleted, setIsCompleted] = useState(true)

    useEffect(() => {
        async function fecthQuestions() {
            const response = await getQuestions()

            if(response === null) {
                showError('Erro ao buscar dados. Tente novamente')
            }
            
            else {
                setQuestions(response.data.responseData)
            }
        }
        fecthQuestions()
    }, [])
   
    const alert = useAlert()

    function showSucess(m) {
        alert.show(m, {type: 'success'})
    }

    function showError(m) {
        alert.show(m, {type: 'error'})
    }    

    function handleSubmit(e, item) {
        console.log(item)

        const fileTypeName = e.target.files[0].type;
        const isFormat = checkFileTypeVideos(fileTypeName);

        if(isFormat.valid) {
            //setQuestions(true)
            setTimeout(() => {
                //setLoading(false);
                //setIsSend(true)
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
        <div>
            {  
                Object.keys(questions).map((key) => {
                    const idToLink = questions[key].id
                    const questionToLink = questions[key].descricao
                    const timeToLink = (
                        questions[key].tempoVideo === null ? 
                        '90' 
                        : questions[key].tempoVideo
                    )

                    return (
                        <div key={questions[key].id} id="video-questions">
                            <div className="questions">
                                <div className="question">
                                        {questions[key].descricao}{" "}
                                    {
                                        questions[key].isSent && <FaCheck className="question-check" />
                                    }
                                    
                                </div>

                                <div className="actions">
                                    {/* <label
                                        htmlFor="send-video"
                                        className="send-button"
                                    >
                                        {
                                            questions[key].isLoading ? (<img style={{
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
                                        onChange={e => handleSubmit(e, questions)}
                                        style={{ display: "none" }}
                                    /> */}

                                    <Link
                                        to={{
                                            pathname: `/gravar-video/${params.id}`,
                                            state: {
                                                idToLink,
                                                questionToLink,
                                                timeToLink,
                                            }
                                        }}
                                        className="send-button"
                                    >
                                        {
                                            //Retornar para video/:id
                                        }
                                        <FaRecordVinyl className="send-button-icon" />
                                        Gravar ou enviar vídeo
                                    </Link>

                                    <button className="send-button">
                                        <FaDownload className="send-button-icon" />
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                )
            }

            {
                
                isCompleted && (
                    <div id="message">
                        <p>Parabéns! Você está concorrendo a esta vaga!</p>
                    </div>
                )
            }
        </div>
    )
}
