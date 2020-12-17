import React, {useEffect, useState} from "react";

//Router
import { Link, useHistory, useParams } from "react-router-dom";

//Question
import Question from './Question'

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

    const QuestionList = [
        {id:'1', description: "Fale seus pontos fortes e fracos", isLoading: false, isSent:true}, 
        {id:'2', description: "Fale sobre seu último trabalho", isLoading: true, isSent:false},
        {id:'3', description: "Fale sobre um desafio que você teve de resolver", isLoading: false, isSent:false},
        {id:'4', description: "Fale sobre sua tecnologia preferida", isLoading: false, isSent:false},
    ]

    //States
    const [questions, setQuestions] = useState(QuestionList)
    const [isCompleted, setIsCompleted] = useState(true)
    
    const alert = useAlert()

    function showSucess(m) {
        alert.show(m, {type: 'success'})
    }

    function showError(m) {
        alert.show(m, {type: 'error'})
    }

    function handleSubmit(item, e) {
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
                Object.keys(questions).map(key => {
                    return (
                        <div key={questions[key].id} id="video-questions">
                            <div className="questions">
                                <div className="question">
                                        {questions[key].description}{" "}
                                    {
                                        questions[key].isSent && <FaCheck className="question-check" />
                                    }
                                    
                                </div>

                                <div className="actions">
                                    <label
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
                                        onChange={e => handleSubmit(questions[key].id,e)}
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
