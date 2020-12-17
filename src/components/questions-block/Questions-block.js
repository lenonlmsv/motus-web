import React, {useEffect, useState} from "react";

//Router
import { Link, useHistory, useParams } from "react-router-dom";

//Question
import Question from './Question'

export default function QuestionsBlock() {
    const params = useParams();

    //States
    const [isCompleted, setIsCompleted] = useState(true)

    const Questions = [
        {id:'1', description: "Fale seus pontos fortes e fracos"},
        {id:'2', description: "Fale sobre seu último trabalho"},
        {id:'3', description: "Fale sobre um desafio que você teve de resolver"},
        {id:'4', description: "Fale sobre sua tecnologia preferida"},
    ]

    return (
        <div>
            {
                Questions.map(question => {
                    return (
                        <Question 
                            id={question.id}
                            question={question.description}/>
                    )
                }) 
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
