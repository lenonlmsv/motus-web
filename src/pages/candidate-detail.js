import React, { useState } from "react";

//Router dom
import { useParams } from "react-router-dom";

//CSS
import "../styles/candidate-detail.css";

//Icons
import { FaTrash } from "react-icons/fa";

//Components
import BackgroundTitle from "../components/background-title/background-title";

//API
import api from "../services/api";

function CandidateDetails() {
	const params = useParams();

	let userData = {
		name: "",
		email: "",
		linkedin: "",
		cellNumber: "",
		phone: "",
		password: "",
		resume: "",
	};

	if (params.id !== "cadastro") {
		//Buscar dados do candidato
		//api.get(`candidato/${params.id}`).then(response => )
		userData.name = "";
		userData.email = "";
	}

	//Form data
	const [name, setName] = useState(userData.name);
	const [email, setEmail] = useState(userData.email);
	const [linkedin, setLinkedin] = useState(userData.linkedin);
	const [cellNumber, setCellNumber] = useState(userData.cellNumber);
	const [phone, setPhone] = useState(userData.phone);
	const [password, setPassword] = useState(userData.password);
	const [resume, setResume] = useState(userData.resume);

	const checkFileType = (fileType) => {
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
			return true;
		} else {
			return false;
		}
	};

	const handleResume = (e) => {
		//Valida o tipo do arquivo
		const fileTypeName = e.target.files[0];
		const isFormat = checkFileType(fileTypeName.type);

		if (isFormat) {
			//Enviar para o backend
			document
				.querySelector("div.input-flex.input-block")
				.classList.remove("input-error");
			document
				.querySelector("div.input-flex.input-block label span")
				.classList.remove("text-error");
			document
				.querySelector("div.file-details")
				.classList.remove("display-none");
			setResume(fileTypeName);
		} else {
			//Erro no arquivo
			document
				.querySelector("div.input-flex.input-block")
				.classList.add("input-error");
			document
				.querySelector("div.input-flex.input-block label span")
				.classList.add("text-error");
			document
				.querySelector("div.file-details")
				.classList.add("display-none");
		}

		sendResume(e);
	};

	const sendResume = (e) => {
		const selectedResume = e.target.files[0];
		setResume(selectedResume);
	};

	const removeResume = () => {
		setResume("");
		document
			.querySelector("div.file-details")
			.classList.add("display-none");
	};

	async function handleSubmit(e) {
		e.preventDefault();

		if (resume === "") {
			//Checa se o currículo foi anexado
			document
				.querySelector("div.input-flex.input-block")
				.classList.add("input-error");
			document
				.querySelector("div.input-flex.input-block label span")
				.classList.add("text-error");
			return;
		}

		const data = new FormData();

		data.append("email", email);
		data.append("celular", cellNumber);
		data.append("linkedin", linkedin);
		data.append("telefone", phone);
		data.append("senha", password);
		data.append("login", email);
		data.append("nome", name);

		//for (var pair of data.entries()) {
		//    console.log(pair);
		//}

		try {
			//await api.post('candidato', data);
		} catch (error) {
			console.log(error.message);
		}
	}

	return (
		<div id="page-candidate-details">
			<BackgroundTitle
				title={name === "" ? "Novo candidato" : `Olá, ${name}`}
				description={
					name === ""
						? "Cadastre-se para concorrer!"
						: "Confira seus dados cadastrados"
				}
			/>

			<main className="display-flex">
				<form className="create-candidate" onSubmit={handleSubmit}>
					<div className="input-block">
						<label htmlFor="name">Nome</label>
						<input
							id="name"
							value={name}
							type="text"
							maxLength="50"
							onChange={(event) => {
								setName(event.target.value);
							}}
							required
						/>
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
							onChange={(event) => {
								setEmail(event.target.value);
							}}
							value={email}
							required
						/>
					</div>

					<div className="input-block">
						<label htmlFor="linkedin">
							Linkedin
							<span>Informe a url para seu perfil</span>
						</label>

						<input
							id="linkedin"
							type="text"
							maxLength="100"
							onChange={(event) => {
								setLinkedin(event.target.value);
							}}
							value={linkedin}
							required
						/>
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
							pattern="[0-9]+"
							maxLength="11"
							minLength="11"
							title="Somente números"
							onChange={(event) => {
								setCellNumber(event.target.value);
							}}
							required
						/>
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
							pattern="[0-9]+"
							maxLength="10"
							minLength="10"
							title="Somente números"
							onChange={(event) => {
								setPhone(event.target.value);
							}}
							required
						/>
					</div>

					<div className="input-block">
						<label htmlFor="password">
							Senha
							<span>
								Informe uma senha para acesso ao sistema
							</span>
						</label>

						<input
							id="password"
							value={password}
							maxLength="10"
							type="password"
							onChange={(event) => {
								setPassword(event.target.value);
							}}
							required
						/>
					</div>

					<div className="input-flex input-block">
						<label htmlFor="resume" className="">
							<strong>Envie seu currículo</strong>
							<span>Formatos .doc, .docx ou .pdf</span>
						</label>

						<input
							id="resume"
							type="file"
							className="display-none"
							onChange={handleResume}
						/>
					</div>

					<div className="file-details display-none">
						<FaTrash color={"red"} onClick={removeResume} />
						<p>{resume.name}</p>
					</div>

					<div class="display-flex button-send">
						<button
							type="submit"
							className="button button-secondary send-form"
						>
							Enviar
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}

export default CandidateDetails;
