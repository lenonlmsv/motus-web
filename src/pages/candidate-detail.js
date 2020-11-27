import React, { useEffect, useState } from "react";

//Router dom
import {Link, useParams, useHistory} from 'react-router-dom';

//CSS
import "../styles/candidate-detail.css";

//Icons
import { FaDownload, FaTrash } from "react-icons/fa";

//Components
import BackgroundTitle from "../components/background-title/Background-title";

//API and Auth
import api from "../services/api";
import { getHashId, login, logout } from "../services/auth";

function CandidateDetails() {
    const history = useHistory();
    const params = useParams();

    //Form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [cellNumber, setCellNumber] = useState('')
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [resume, setResume] = useState('')
    
    useEffect(() => {
        try {
            const getData = async function() {
                api.defaults.headers.post['Content-Type'] = 'application/json';
    
                await api.get(`/candidato`).then(response => {
                    api.get(`/candidato-curriculo/${getHashId()}`).then(response => {
                        setResume({
                            'name' : response.data.responseData[0].nomeArquivo,
                            'hashId': response.data.responseData[0].hashId,
                        });
                        document.querySelector('div.file-details').classList.remove('display-none');
                    });
                    
                    const data = response.data.responseData;
                    setName(data.nome);
                    setEmail(data.email);
                    setCellNumber(data.celular);
                    setPhone(data.telefone);
                    setLinkedin(data.linkedin)
                    
                })
            }
            getData()
        }
        
        catch (error) {
            console.log(error)
        }        
    }, [params.id])
    
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

    function downloadResume(e) {     
        console.log(resume);
        let a = document.createElement('a')
        a.style = 'display:none';
        a.download = resume.name;
        
        if (resume.hashId == undefined) {
            const resumeURL = window.URL.createObjectURL(resume);
            a.href = resumeURL; //api.get(`/candidato-curriculo/download/${resume.hashId}`);
        }
        
        else {
            a.href = api.get(`/candidato-curriculo/download/${resume.hashId}`);
        }
        a.click();
    }

    async function handleSubmit(e) {
        e.preventDefault();
            
        if(resume === '') { //Checa se o currículo foi anexado
            document.querySelector('div.input-flex.input-block').classList.add('input-error');
            document.querySelector('div.input-flex.input-block label span').classList.add('text-error');
            return;
        }

        const data = {
            "email":email,
            "celular": cellNumber,
            "linkedin": linkedin,
            "telefone": phone,
            "senha": password,
            "login": email,
            "nome": name,
            "hashId": getHashId(),
        }

        try {
            api.defaults.headers.post['Content-Type'] = 'application/json'; //USAR FORMATO JSON
            
            let json = JSON.stringify(data);
            console.log(json)

            await api.put('/candidato', json);

            api.defaults.headers.post['Content-Type'] = 'multipart/form-data'; //USAR FORMATO DE ARQUIVO

            const userResume = new FormData();

            userResume.append('arquivo', resume);

            await api.post('candidato-curriculo', userResume);
            
            alert('Usuário alterado com sucesso');
            history.push('/oportunidades');
        }
            
        catch (error) {
            console.log(`Error: ${error.message}`);
            alert("Erro ao editar usuário. Tente novamente!")
        }
    }

    return (
        <div id='page-candidate-details' className="page-position">
            <BackgroundTitle  
                title={`Meus dados`}
                description={'Confira seus dados cadastrados'}/>

            <main className='display-flex'>                    
                <form className="create-candidate" onSubmit={handleSubmit}>
                    <div className="input-block">
                        <label htmlFor="name">
                            Nome</label>
                        <input 
                            id="name" 
                            value={name}
                            type="text"
                            maxLength="50"
                            onChange={event => {setName(event.target.value)}}
                            required/>
                    </div>

                    <div className="input-block">
                        <label htmlFor="email">
                            E-mail
                            <span>
                                Seu email será usado como login de acesso
                            </span>
                        </label>
                        <input 
                            type="email" 
                            id="email"
                            maxLength="40"
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
                            maxLength="100"
                            onChange={event => {setLinkedin(event.target.value)}}
                            value={linkedin}
                            required/>
                    </div> 

                    <div className="input-block">
                        <label htmlFor="phone-number">
                            Celular
                            <span>
                                Formato: 11 dígitos com DDD (21999999999)
                            </span>
                         </label>

                        <input 
                            id="phone-number" 
                            value={cellNumber}
                            type="text"
                            pattern = "[0-9]+"
                            maxLength="11"
                            minLength="11"
                            title="Somente números"
                            onChange={event => {setCellNumber(event.target.value)}}
                            required/>
                    </div>

                    <div className="input-block">
                        <label htmlFor="phone">
                            Telefone
                            <span>
                                Formato: 10 dígitos com DDD (2133333333)
                            </span>                            
                        </label>
                            
                        <input 
                            id="phone" 
                            value={phone}
                            type="text"
                            pattern = "[0-9]+"
                            maxLength="10"
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
                            maxLength="10"
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
                        <FaDownload color={'blue'} onClick={downloadResume}/>
                        <p>{resume.name}</p>
                    </div>


                    <div class='display-flex button-send'>
                        <Link to="/" className="button button-secondary">
                            Ver oportunidades
                        </Link>

                        <button type="submit" className="button button-primary send-form">
                            Enviar
                        </button>
                    </div>

                </form>
            </main>
        </div>
        )
    }

export default CandidateDetails;
