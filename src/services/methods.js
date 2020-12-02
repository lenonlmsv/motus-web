import api from './api'

//Auth
import {getUserName} from './auth'

export async function deleteResume(resumeHashId) {
    try {
        await api.post(`candidato-curriculo/delete/${resumeHashId}`);
    }   

    catch(e) {
        console.log(e.message)
    }
}

export async function getResumes() {
    try {
        let responseOut;

        await api.get(`candidato-curriculo/DOCUMENTO`).then(response => {
            responseOut = response.data.responseData
        });

        return responseOut;
    }

    catch(e) {
        console.log(e)
        return null;
    }
}

export async function downloadResume(resumeHashId, fileName) {
    let a = document.createElement('a');
    a.href = api.get(`/candidato-curriculo/download/${resumeHashId}`);
    a.style = 'display:none';
    a.download = fileName;
    a.click();      
}

export async function sendResume(resume) {
    try {
        api.defaults.headers.post['Content-Type'] = 'multipart/form-data'; //USAR FORMATO DE ARQUIVO

        const data = new FormData();

        data.append('arquivo', resume);
        data.append('name', resume.name);
        data.append('tipoCurriculo', 'DOCUMENTO');

        api.post('/candidato-curriculo', data)
    }

    catch(e) {
        console.log(e)
    }
}

export async function getOpportunities(page) {
    try {
        const currPage = page;
        const items = 100;
        const opportunities = await api.get(`/oportunidade/${currPage}/${items}`);
        return opportunities;
    }

    catch(e) {
        console.log(e);
        return null
    }
}

export async function getOpportunitieDetail(vagaId) {
    try {
        const opportunitie = await api.get(`/oportunidade/${vagaId}`)
        return opportunitie;
    }
    
    catch(e){
        console.log(e);
        return null;
    }
}

export default function Methods() {

}