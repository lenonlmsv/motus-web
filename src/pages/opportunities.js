import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//Components
import BackgroundTitle from '../components/background-title/background-title'

//CSS
import '../styles/opportunities.css'

function Opportunities() {
    //States
    const [card, setCard] = useState('opportunities-card-closed');
    const [description, setDescription] = useState('opportunitie-description-closed');
    
    const openCard = () => {
        setCard('')
        setDescription('')
    }
    
    const closeCard = () => {
        setCard('opportunities-card-closed');
        setDescription('opportunitie-description-closed');
    }

    const triggerCard = (event) => {
        card !== 'opportunities-card-closed' ? closeCard() : openCard();
    }

    return (
        <div id="page-opportunities">
            <BackgroundTitle 
                title={'Junte-se a nós!'} 
                description={'A história da Sys Manager é construída com a contribuição de uma equipe talentosa empenhada em sempre entregar a melhor solução para os clientes.'}/>

            <div className="opportunities-list">
                <h1>Vagas em aberto</h1>
                <div className="opportunities">
                    <div 
                        onClick={triggerCard}
                        className={`opportunities-card ${card}`}>

                        <h3>Desenvolvedor React</h3>
                        <i>ícone</i>
                    </div>

                    <div className={`opportunitie-description ${description}`}>
                        <strong>Número de vagas:</strong>
                        <p id="opportunitie-name">199</p>

                        <strong>Descrição da vaga:</strong>
                        <p id="p">
                            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>

                        <strong>Tipo de vaga:</strong>
                        <p>Sênior</p>

                        <strong>Horário de trabalho:</strong>
                        <p>Das 9 às 19h</p>
                        
                        <strong>Qualificações e habilidades:</strong>
                        <p>
                            is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                        </p>

                        <Link to={`/opportunities/:id`} className="button button-secondary opportunitie-button">
                        Candidate-se
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Opportunities;