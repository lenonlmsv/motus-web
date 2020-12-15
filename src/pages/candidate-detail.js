import React, { useEffect, useState } from "react";

//Router dom
import {Link, useParams, useHistory} from 'react-router-dom';

//CSS
import "../styles/candidate-detail.css";

//Components
import BackgroundTitle from "../components/background-title/Background-title";
import ResumesList from '../components/resumes-list/ResumesList'
import {InputPhoneNumber, InputPhone} from '../components/Input'
import OpportunitiesBlock from '../components/opportunities-block/Opportunities-block'

//API and Auth
import api from "../services/api";
import { getHashId,setUserName } from "../services/auth";

//Alert
import { useAlert } from 'react-alert';

function CandidateDetails() {
    const alert = useAlert();

	const showError = (message) => {
        alert.show(message, {type: 'error'})
    }

    const showSuccess = (message) => {
        alert.show(message, {type: 'success'})
    }

    const history = useHistory();
    const params = useParams();

    //Form data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [cellNumber, setCellNumber] = useState('')
    const [phone, setPhone] = useState('');
    //const [password, setPassword] = useState('');
    //const [resume, setResume] = useState('')
    
    useEffect(() => {
        try {
            const getData = async function() {
                api.defaults.headers.post['Content-Type'] = 'application/json';
    
                await api.get(`/candidato`).then(response => {
                    try {
                        // api.get(`/candidato-curriculo/DOCUMENTO`).then(response => {
                        //     setResume({
                        //         'name' : response.data.responseData[0].nomeArquivo,
                        //         'hashId': response.data.responseData[0].hashId,
                        //     });
                        // //document.querySelector('div.file-details').classList.remove('display-none');
                        // });
                    }

                    catch(error) {
                         showError('Erro ao buscar currículo')
                     }
                    
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
    }, [])
    
    // const checkFileType = (fileType) => {
    //     const acceptedTypes = [
    //         //Checar tipos de arquivo aceitos
    //         {name:'application/msword', type:' .doc'},
    //         {name:'application/vnd.openxmlformats-officedocument.wordprocessingml.document', type:' .docx'},
    //         {name:'application/pdf', type:' .pdf'}
    //     ]
        
    //     const isValid = acceptedTypes.find(type => type.name == fileType);

    //     if(isValid !== undefined) {
    //         return true;
    //     }

    //     else {
    //         return false;
    //     }
    // }
    
    // const handleResume = (e) => {
    //     //Valida o tipo do arquivo
    //     const fileTypeName = e.target.files[0];
    //     const isFormat = checkFileType(fileTypeName.type);
        
    //     if(isFormat) {
    //         //Enviar para o backend
    //         document.querySelector('div.input-flex.input-block').classList.remove('input-error');           
    //         document.querySelector('div.input-flex.input-block label span').classList.remove('text-error');
    //         document.querySelector('div.file-details').classList.remove('display-none')
    //         setResume(fileTypeName)          
    //     }
        
    //     else {
    //         //Erro no arquivo
    //         document.querySelector('div.input-flex.input-block').classList.add('input-error');
    //         document.querySelector('div.input-flex.input-block label span').classList.add('text-error');
    //         document.querySelector('div.file-details').classList.add('display-none')   
    //     }

    //     sendResume(e);
    // }

    // const sendResume = (e) => {
    //     const selectedResume = e.target.files[0];
    //     setResume(selectedResume);
    // }

    // const removeResume = () => {
    //     setResume('');
    //     document.querySelector('div.file-details').classList.add('display-none');
    // }

    // function downloadResume(e) {     
    //     let a = document.createElement('a')
    //     a.style = 'display:none';
    //     a.download = resume.name;
        
    //     if (resume.hashId == undefined) {
    //         const resumeURL = window.URL.createObjectURL(resume);
    //         a.href = resumeURL;
    //     }
        
    //     else {
    //         a.href = api.get(`/candidato-curriculo/download/${resume.hashId}`);
    //     }
    //     a.click();
    // }

    async function handleSubmit(e) {
        e.preventDefault();
            
        // if(resume === '') { //Checa se o currículo foi anexado
        //     document.querySelector('div.input-flex.input-block').classList.add('input-error');
        //     document.querySelector('div.input-flex.input-block label span').classList.add('text-error');
        //     return;
        // }

        const data = {
            "celular": cellNumber,
            "email":email,
            "hashId": getHashId(),
            "linkedin": linkedin,
            "login": email,
            "nome": name,
            "telefone": phone,
            //"senha": password,
        }

        try {
            api.defaults.headers.post['Content-Type'] = 'application/json'; //USAR FORMATO JSON
            
            let json = JSON.stringify(data);

            await api.post('/candidato', json);

            // api.defaults.headers.post['Content-Type'] = 'multipart/form-data'; //USAR FORMATO DE ARQUIVO

            // const userResume = new FormData();

            // userResume.append('arquivo', resume);
            // userResume.append('name', resume.name);
            // userResume.append('tipoCurriculo', 'DOCUMENTO');

            // await api.post('candidato-curriculo', userResume);
            
            setUserName(data.nome)
            showSuccess('Usuário alterado com sucesso');
            history.push('/oportunidades');
        }
            
        catch (error) {
            console.log(`${error.message}`);
            showError("Erro ao editar usuário. Tente novamente!")
        }
    }

    function removeDisplay() {
        const divs = document.querySelectorAll('.tab-item');
        Object.keys(divs).map((key) => {
            divs[key].classList.remove('display-none')
        })

        const buttons = document.querySelectorAll('#tab-buttons button');
        Object.keys(buttons).map((key) => {
            buttons[key].classList.add('button-hide')
        })
    }

    function changeTab(e, tabItem) {
        removeDisplay()
        const divs = document.querySelectorAll('.tab-item');
        Object.keys(divs).map((key) => {
            const item = divs[key]
            item.id !== tabItem && item.classList.add('display-none')
        })

        e.target.classList.remove('button-hide')
    }

    return (
        <div id='page-candidate-details' className="page-position">
            <BackgroundTitle  
                title={`Meus dados`}
                description={'Confira seus dados cadastrados'}/>

            <div id='tab-buttons'>
                <button
                    className='button-tab'
                    onClick={(e) => changeTab(e,'tab-info')}>Meu cadastro</button>
				<button
                    className='button-tab button-hide'
                    onClick={(e) => changeTab(e,'tab-history')}>Minhas candidaturas</button>
			</div>

            <main id='tab-info' className='display-flex tab-item'>                    
                <form onSubmit={handleSubmit}>
                    <div className="input-block ">
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
                                O seu e-mail não pode ser alterado
                            </span>
                        </label>
                        <input 
                            type="email" 
                            id="email"
                            maxLength="40"
                            onChange={event => {setEmail(event.target.value)}}
                            value={email}
                            disabled/>
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

                        {/* <input 
                            id="phone-number" 
                            value={cellNumber}
                            type="text"
                            pattern = "[0-9]+"
                            maxLength="11"
                            minLength="11"
                            title="Somente números"
                            onChange={event => {setCellNumber(event.target.value)}}
                            required/> */}
                        
                        <InputPhoneNumber
                            value={cellNumber}
                            onChange={event => {setCellNumber(event.target.value)}}/>
                    </div>

                    <div className="input-block">
                        <label>
                            Telefone
                            <span>
                                Formato: 10 dígitos com DDD (2133333333)
                            </span>                            
                        </label>
                            
                        {/* <input 
                            id="phone" 
                            value={phone}
                            type="text"
                            pattern = "[0-9]+"
                            maxLength="10"
                            minLength="10"
                            title="Somente números"
                            onChange={event => {setPhone(event.target.value)}}
                            required/> */}

                        <InputPhone
                            value={phone}
                            onChange={event => {setPhone(event.target.value)}}/>
                            
                    </div>

                    {/* <div className="input-block">
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
                    </div> */}

                    <div className="input-block">
                        <label 
                            htmlFor='change-password'
                            style={{cursor:'pointer'}}>
                                Redefinir senha
                                <span>
                                    Você receberá um e-mail parar alterar a senha de acesso
                                </span>
                            
                        </label>
                    </div>

                    <div className="input-block">
                        <label 
                            htmlFor='send-video'
                            style={{cursor:'pointer'}}
                            onClick={() => history.push('/video-curriculo')}>
                                Vídeo Currículo
                                <span>
                                    Grave seu vídeo currículo e aumente suas chances
                                </span>
                            
                        </label>
                    </div>

                    {/* <div className="input-flex input-block">
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
                    </div> */}

                    <ResumesList/>

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
            
            <div id='tab-history' className='tab-item display-none'>
                <OpportunitiesBlock/>
            </div>
        </div>
        )
    }

export default CandidateDetails;
