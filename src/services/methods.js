import api from './api'

//Alert 
import Alert from '../components/Alert'

export async function deleteResume(resumeHashId) {
    try {
        await api.delete(`candidato-curriculo/${resumeHashId}`);
        <Alert m='Currículo deletado com sucesso' type='success'/>
    }

    catch(e) {
        <Alert m={e.message} type='error'/>
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
        <Alert m={e.message} type='error'/>
        return null;
    }
}

export async function downloadResume(resumeHashId) {
    try {
        await api.get(`candidato-curriculo/download/${resumeHashId}`);
    }

    catch(e) {
        <Alert m={e.message} type='error'/>
    }
}