import api from './api'

export async function deleteResume(resumeHashId) {
    const resumes = await api.get('/candidato-curriculo/DOCUMENTO');

    console.log(resumes)
}