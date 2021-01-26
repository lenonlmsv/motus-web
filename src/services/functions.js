export function checkFileTypeVideos(fileType) {
	const acceptedTypes = [
		//Checar tipos de arquivo aceitos
		{ name: "video/mp4", type: " .mp4" },
		{ name: "video/webm", type: " .webm" },
	];

	const isValid = acceptedTypes.find((type) => type.name == fileType);

	if (isValid !== undefined) {
		return { valid: true };
	} else {
		//Mostra os formatos em mensagem na tela
		const formats = acceptedTypes.map((format) => {
			return format.type;
		});

		//setError(`Os formatos aceitos são ${formats}`)
		return {
			valid: false,
			acceptedFormats: `Os formatos aceitos são ${formats}`,
		};
	}
}

export function checkFileTypeFiles(fileType) {
	const acceptedTypes = [
		//Checar tipos de arquivo aceitos
		{ name: "application/msword", type: " .doc" },
		{
			name:
				"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			type: " .docx",
		},
		{ name: "application/pdf", type: " .pdf" },
	];

	const isValid = acceptedTypes.find((type) => type.name == fileType);

	if (isValid !== undefined) {
		return { valid: true };
	} else {
		const formats = acceptedTypes.map((format) => {
			return format.type;
		});

		return {
			valid: false,
			acceptedFormats: `Os formatos aceitos são ${formats}`,
		};
	}
}

export const verificarTelefones = (celular, numeroLivre) => {
	const regEx = /^\([0-9]{2}\) \9[0-9]{4}-[0-9]{4}$/;

	if (regEx.test(celular) | (numeroLivre.length > 8)) {
		return true;
	}

	return false;
};

export const constHandleFreeNumber = (e, setPhone) => {
	const newNumber = e.replace(/[^0-9()-\s+]+/, "");
	//console.log(newNumber);
	//	console.log(e.target.value);
	setPhone(newNumber);
};

export const checkTokenExpiration = (horaTokenExpira, horaAtual) => {
	var diff = Math.abs(horaTokenExpira - horaAtual) / 3600000;
	//	console.log("Hora de expiração do token: " + horaTokenExpira);
	//console.log("Hora atual: " + horaAtual);
	//console.log(diff);

	if (diff <= 0) return true;
	else return false;
};
