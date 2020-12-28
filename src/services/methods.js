import api from "./api";

//userName
import { getUserName } from "./auth";
import { useAlert } from "react-alert";
//Base64
//import * as base64Methods from "../base64";
export const ShowSuccess = (message, alert) => {
	//const alert = useAlert();
	alert.show(message, { type: "success" });
};

export const ShowError = (message, alert) => {
	//const alert = useAlert();
	alert.show(message, { type: "error" });
};

export async function loginUser(data) {
	try {
		api.defaults.headers.post["Content-Type"] = "application/json"; //USAR FORMATO JSON

		const json = JSON.stringify(data);

		await api.post("/api/service/login", data).then((response) => {
			const string = response.data.split(" ");
			const token = string[1]; //Get token
		});
	} catch (error) {
		console.log(error.message);
	}
}

export async function changePassword(
	senhaAntiga,
	novaSenha,
	confirmarNovaSenha
) {
	//const alert = useAlert();
	//let response;
	try {
		api.defaults.headers.post["Content-Type"] = "multipart/form-data"; //USAR FORMATO DE ARQUIVO

		const data = new FormData();
		data.append("antigaSenha", senhaAntiga);
		data.append("confirmacaoSenha", confirmarNovaSenha);
		data.append("novaSenha", novaSenha);

		const response = await api.post("candidato/alterar-senha", data);

		console.log(response);
		return response.data;
	} catch (err) {
		console.log("msg de erro");
		console.log(err);
		//console.log(response);
		return err;
	}
}

export async function getVideoCurriculo(vagaId) {
	try {
		const response = await api.get(`candidatura-video/${vagaId}`);

		return response;
	} catch (error) {
		return error;
	}
}

export async function deleteResume(resumeHashId) {
	try {
		await api.post(`candidato-curriculo/delete/${resumeHashId}`);
	} catch (e) {
		console.log(e.message);
	}
}

export async function getResumes() {
	try {
		let responseOut;

		await api.get(`candidato-curriculo/DOCUMENTO`).then((response) => {
			responseOut = response.data.responseData;
		});

		return responseOut;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function downloadFile(fileHashId, fileName) {
	const apiKey = process.env.REACT_APP_API_KEY
	const apiURL = process.env.REACT_APP_API_ENDPOINT
	
	let a = document.createElement("a");
	a.href = `${apiURL}candidato-curriculo/download/${fileHashId}/${apiKey}`
	a.style = "display:none";
	a.download = fileName;
	console.log('hash', fileHashId)
	console.log('url', a.href)
	a.click();
}

async function getRecordedQuestions(opportunityId) {
	try {
		let response = await api.get(`/candidatura-video/${opportunityId}`);
		return { status: 'ok', itens: response.data.responseData };

	} catch (e) {
		console.log(e.message);
		const response = { status: null, message: `Erro ao enviar arquivo` };
		return response;
	}
}

export async function downloadVideoAnswer(opportunityId, questionId) {
	//Pega a lista de currículos vídeos enviada
	const response = await getRecordedQuestions(opportunityId);
	const userVideo = response.itens.find(item => item.perguntaId === questionId)

	let a = document.createElement("a");
	a.href = userVideo.urlArquivo;
	a.style = "display:none";
	a.click();
}

export async function sendResume(resume) {
	try {
		api.defaults.headers.post["Content-Type"] = "multipart/form-data"; //USAR FORMATO DE ARQUIVO

		const data = new FormData();

		data.append("arquivo", resume);
		data.append("name", resume.name);
		data.append("tipoCurriculo", "DOCUMENTO");

		await api.post("/candidato-curriculo", data);
		return {
			status: 'ok'
		}
	} catch (e) {
		console.log(e);
		return {
			status: null
		}
	}
}

export async function checkVideoResume() {
	try {	 
		const response = await api.get(`candidato-curriculo/VIDEO`);
		if(response.data.responseData === []) {
			return []
		}

		else {
			return {status: 'ok', data: response.data.responseData}
		}
	}

	catch(e) {
		return {status: 'error'}
	}
}

export async function getOpportunities(page, search) {
	try {
		search !== "" && (search = `?busca=${search}`);
		const currPage = page;
		const items = 100;
		const opportunities = await api.get(
			`/oportunidade/${currPage}/${items}${search}`
		);
		return opportunities;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function getOpportunitieDetail(vagaId) {
	try {
		const opportunitie = await api.get(`/oportunidade/${vagaId}`);
		return opportunitie;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function checkIsCandidate() {
	try {
		const response = await api.get(`candidatura/`);

		if (response.data.responseData.length === 0) {
			return false;
		} else {
			const opp = response.data.responseData.map((opps) => {
				return opps.vagaId;
			});

			return {
				status: true,
				opps: opp,
			};
		}
	} catch (e) {
		console.log(e);
	}
}

export async function getCandidatures() {
	try {
		const response = await api.get(`candidatura/`);

		if (response.data.responseData.length === 0) {
			return false;
		} else {
			const opp = response.data.responseData;
			return opp;
		}
	} catch (e) {
		console.log(e);
	}
}

export function createCandidature(vagaId) {
	try {
		const response = api.post(`candidatura/${vagaId}`);
		return response;
	} catch (e) {
		console.log(e);
	}
}

export async function sendVideoResume(file) {
	api.defaults.headers.post["Content-Type"] = "multipart/form-data"; //USAR FORMATO DE ARQUIVO

	const data = new FormData();

	data.append("arquivo", file);
	data.append("tipoCurriculo", "VIDEO");

	try {
		await api.post("/candidato-curriculo", data);
		return { status: "ok", message: "" };
	} catch (e) {
		console.log(e.message);
		switch (e.message) {
			case "Network Error":
				return {
					status: "error",
					message: "Arquivo maior que o permitido",
				};
			default:
				return { status: "error", message: "Erro interno" };
		}
	}
}

export async function getVideoQuestions() {
	try {
		//const questions = 5
		const response = await api.get("/pergunta");
		return response;
	} catch (e) {
		console.log(e);
		return null;
	}
}

export async function sendVideoAnswer(file, questionId, opportunityId) {
	const user = getUserName();

	api.defaults.headers.post["Content-Type"] = "multipart/form-data";

	const data = new FormData();

	data.append("arquivo", file);
	data.append("name", `video-resposta-${user}-id${questionId}`);
	data.append("perguntaId", questionId);
	data.append("vagaId", opportunityId);

	try {
		await api.post("/candidatura-video", data);
		const response = { status: "ok", message: "Vídeo enviado com sucesso" };
		return response;
	} catch (e) {
		console.log(e.message);
		const response = { status: null, message: `Erro ao enviar arquivo` };
		return response;
	}
}

export async function checkRecordedQuestions(opportunityId) {
	try {
		const itens = await api.get(`/candidatura-video/${opportunityId}`);
		let response = []
		itens.data.responseData.map((item) => {
			response.push(item.perguntaId);
		});

		const returnResponse = Array.from(new Set(response));
		return returnResponse;
	} catch (e) {
		console.log(e.message);
		const response = { status: null, message: `Erro ao enviar arquivo` };
		return response;
	}
}

export default function Methods() {}
