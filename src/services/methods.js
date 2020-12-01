import api from './api' 

export async function deleteResume(resumeHashId) {
    try {
        await api.delete(`candidato-curriculo/${resumeHashId}`);
    }

    catch(e) {
        console.log(e.message)
    }
}

export async function getResumes() {
    try {
        const response = await api.get(`candidato-curriculo/DOCUMENTOS`).response.data.responseData;
        return response;
    }

    catch(e) {
        console.log(e.message)
        return null;
    }
}