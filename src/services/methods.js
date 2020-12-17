import api from "./api";
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

export async function downloadResume(resumeHashId, fileName) {
	let a = document.createElement("a");
	//a.href = api.get(`/candidato-curriculo/download/${resumeHashId}`);

	try {
		const link = await api.get(
			`/candidato-curriculo/download/${resumeHashId}`
		);
		//const teste = window.URL.createObjectURL(link.data)
		//const blob = new Blob(link.data, {type:'text'})

		//const base64 = btoa(unescape(encodeURIComponent(link.data)))
		//const data = new Blob([link.data], {type: 'application/octet-stream;charset=UTF-8'})//[link.data]), {type: 'application/msword;charset=UTF-8'});

		// const base64 = base64Methods.base64encode(link.data, 'charset=UTF-8');
		// const base64Dec = base64Methods.base64decode(base64, 'charset=UTF-8');
		// const data = new Blob([base64Dec]);
		// const url = window.URL.createObjectURL(data);

		console.log(link);
		//a.href = url//data:application/octet-stream;base64,${link}`
		a.style = "display:none";
		a.download = fileName;
		a.click();
	} catch (e) {
		console.log(e);
	}
}

export async function sendResume(resume) {
	try {
		api.defaults.headers.post["Content-Type"] = "multipart/form-data"; //USAR FORMATO DE ARQUIVO

		const data = new FormData();

		data.append("arquivo", resume);
		data.append("name", resume.name);
		data.append("tipoCurriculo", "DOCUMENTO");

		api.post("/candidato-curriculo", data);
	} catch (e) {
		console.log(e);
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

export async function sendVideoAnswer() {
	try {
		await api.post;
	} catch (e) {
		console.log(e.message);
	}
}

export async function getQuestions() {
    try {
        const questions = 5 //5
    }

    catch(e) {
        console.log(e)
    }
}

export async function sendAnswer() {
    try {
        const questions = 5 //5
    }

    catch(e) {
        console.log(e)
    }
}

export async function checkAnswer() {
    try {
        const questions = 5 //5
    }

    catch(e) {
        console.log(e)
    }
}

export default function Methods() {

}
