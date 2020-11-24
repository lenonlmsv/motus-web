import React, {useState} from 'react';

//Router dom
import {useParams} from 'react-router-dom';

//CSS
import '../styles/candidate-detail.css'

//Icons
import { FaTrash } from 'react-icons/fa';

//Components
import BackgroundTitle from '../components/background-title/background-title';

function CandidateDetails() {
    const params = useParams();

    //Form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [resume, setResume] = useState('');

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
    
    const handleResume = (e) => {
        //Valida o tipo do arquivo
        const fileTypeName = e.target.files[0];
        const isFormat = checkFileType(fileTypeName.type);
        
        if(isFormat) {
            //Enviar para o backend
            document.querySelector('div.input-flex.input-block').classList.remove('input-error');           
            document.querySelector('div.input-flex.input-block label span').classList.remove('text-error');
            document.querySelector('div.file-details').classList.remove('display-none')
            setResume(fileTypeName)          
        }

        else {
            //Erro no arquivo
            document.querySelector('div.input-flex.input-block').classList.add('input-error');
            document.querySelector('div.input-flex.input-block label span').classList.add('text-error');
            document.querySelector('div.file-details').classList.add('display-none')
           
        }

        sendResume(e);
    }

    const sendResume = (e) => {
        const selectedResume = e.target.files[0];
        setResume(selectedResume);
    }

    const removeResume = () => {
        setResume('');
        document.querySelector('div.file-details').classList.add('display-none');
    }

    if (params.id === 'cadastro') { //Novo candidato

        const handleSubmit = (e) => {
            e.preventDefault();
            
            if(resume === '') { //Checa se o currículo foi anexado
                document.querySelector('div.input-flex.input-block').classList.add('input-error');
                document.querySelector('div.input-flex.input-block label span').classList.add('text-error');
                return;
            }

            
        }

        return (
            <div id='page-candidate-details'>
                <BackgroundTitle  title="Novo candidato" description="Cadastre-se para concorrer!"/>
                <main className='display-flex'>                    
                    <form className="create-candidate" onSubmit={handleSubmit}>
                        <div className="input-block">
                            <label htmlFor="name">Nome</label>
                            <input 
                                id="name" 
                                value={name}
                                type="text"
                                onChange={event => {setName(event.target.value)}}
                                required/>
                        </div>

                        <div className="input-block">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email" 
                                id="email" 
                                onChange={event => {setEmail(event.target.value)}}
                                value={email}
                                required/>
                        </div>

                        <div className="input-block">
                            <label htmlFor="linkedin">
                                Linkedin 
                                <span>
                                    Informe a url para seu perfil
                                </span>
                            </label>
                            <input 
                                id='linkedin'
                                type='text'
                                onChange={event => {setLinkedin(event.target.value)}}
                                value={linkedin}/>
                        </div> 

                        <div className="input-block">
                            <label htmlFor="phone-number">
                                Telefone
                                <span>
                                    Formato: 10 ou 11 dígitos com DDD (21999999999)
                                </span>
                            </label>
                            <input 
                                id="phone-number" 
                                value={phone}
                                type="text"
                                pattern = "[0-9]+"
                                maxLength="11"
                                minLength="10"
                                title="Somente números"
                                onChange={event => {setPhone(event.target.value)}}
                                required/>
                        </div>

                        <div className="input-block">
                            <label htmlFor="password">Senha
                                <span>
                                    Informe uma senha para acesso ao sistema
                                </span>
                            </label>
                            <input 
                                id="password" 
                                value={password}
                                type="password"
                                onChange={event => {setPassword(event.target.value)}}
                                required/>
                        </div>

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

                        <div className="file-details display-none">
                            <FaTrash color={'red'} onClick={removeResume}/>
                            <p>{resume.name}</p>
                        </div>

                        <div class='display-flex button-send'>
                            <button type="submit" className="button button-secondary send-form">
                                Enviar
                            </button>
                        </div>

                    </form>
                </main>
            </div>
        )
    }

    else {
        //Buscar dados API
        return (
            <div id='page-candidate-details'>
                <BackgroundTitle title="Lenon Manhães" description="Consulte seus dados!"/>
                <p>Candidato detalhes</p>
            </div>
        )
    }
}

export default CandidateDetails;