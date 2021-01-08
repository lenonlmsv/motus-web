import React, { useEffect, useState } from "react";

//Router dom
import { Link, useParams, useHistory } from "react-router-dom";

//CSS
import "../styles/candidate-detail.css";

//Components
import BackgroundTitle from "../components/background-title/Background-title";
import ResumesList from "../components/resumes-list/ResumesList";
import { InputPhoneNumber, InputPhone } from "../components/Input";
import CandidatureBlock from "../components/candidature-block/Candidature-block";

//API and Auth
import api from "../services/api";
import { getHashId, setUserName } from "../services/auth";
import {
	checkVideoResume,
	downloadFile,
	deleteResume,
} from "../services/methods";

//Icons
import { FaDownload, FaTrash } from "react-icons/fa";

//Alert
import { useAlert } from "react-alert";

function CandidateDetails() {
	const alert = useAlert();

	const showError = (message) => {
		alert.show(message, { type: "error" });
	};

	const showSuccess = (message) => {
		alert.show(message, { type: "success" });
	};

	const history = useHistory();
	const params = useParams();

	//Form data
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [linkedin, setLinkedin] = useState("");
	const [cellNumber, setCellNumber] = useState("");
	const [phone, setPhone] = useState("");
	const [videoResume, setVideoResume] = useState("");

	useEffect(() => {
		try {
			async function getData() {
				api.defaults.headers.post["Content-Type"] = "application/json";

				await api.get(`/candidato`).then((response) => {
					const data = response.data.responseData;
					setName(data.nome);
					setEmail(data.email);
					setCellNumber(data.celular);
					setPhone(data.telefone);
					setLinkedin(data.linkedin);
				});

				getVideoResume();
			}

			async function getVideoResume() {
				const videoResumeList = await checkVideoResume();
				videoResumeList.status === "ok" &&
					setVideoResume(videoResumeList.data);
			}

			getData();
		} catch (error) {
			//console.log(error);
		}
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();

		const data = {
			celular: cellNumber,
			email: email,
			hashId: getHashId(),
			linkedin: linkedin,
			login: email,
			nome: name,
			telefone: phone,
			//"senha": password,
		};

		try {
			api.defaults.headers.post["Content-Type"] = "application/json"; //USAR FORMATO JSON

			let json = JSON.stringify(data);

			await api.post("/candidato", json);

			setUserName(data.nome);
			showSuccess("Usuário alterado com sucesso");
			history.push("/oportunidades");
		} catch (error) {
			//console.log(`${error.message}`);
			showError("Erro ao editar usuário. Tente novamente!");
		}
	}

	function removeDisplay() {
		const divs = document.querySelectorAll(".tab-item");
		Object.keys(divs).map((key) => {
			divs[key].classList.remove("display-none");
		});

		const buttons = document.querySelectorAll("#tab-buttons button");
		Object.keys(buttons).map((key) => {
			buttons[key].classList.add("button-hide");
		});
	}

	function changeTab(e, tabItem) {
		removeDisplay();
		const divs = document.querySelectorAll(".tab-item");
		Object.keys(divs).map((key) => {
			const item = divs[key];
			item.id !== tabItem && item.classList.add("display-none");
		});

		e.target.classList.remove("button-hide");
	}

	function deleteResumeAPI(hashId) {
		deleteResume(hashId);
		setVideoResume("");
	}

	function downloadResumeAPI(hashId, filename) {
		downloadFile(hashId, filename);
	}

	return (
		<div id="page-candidate-details" className="page-position">
			<BackgroundTitle title={`Meus dados`} />

			<div id="tab-buttons">
				<button
					className="button-tab"
					onClick={(e) => changeTab(e, "tab-info")}
				>
					Meu cadastro
				</button>
				<button
					className="button-tab button-hide"
					onClick={(e) => changeTab(e, "tab-history")}
				>
					Minhas candidaturas
				</button>
			</div>

			<main id="tab-info" className="display-flex tab-item">
				<form onSubmit={handleSubmit}>
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
						<label htmlFor="email" className="label-span">
							E-mail
							<span>(O seu e-mail não pode ser alterado)</span>
						</label>
						<input
							type="email"
							id="email"
							maxLength="40"
							onChange={(event) => {
								setEmail(event.target.value);
							}}
							value={email}
							disabled
						/>
					</div>

					<div className="input-block">
						<label htmlFor="linkedin" className="label-span">
							Linkedin
							<span>(Informe a url para seu perfil)</span>
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
						<label htmlFor="phone-number" className="label-span">
							Celular
							<span>
								(Formato: 11 dígitos com DDD. Exp.: 21999999999)
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
							onChange={(event) => {
								setCellNumber(event.target.value);
							}}
						/>
					</div>

					<div className="input-block">
						<label className="label-span">
							Telefone
							<span>
								(Formato: 10 dígitos com DDD. Exp.: 2133333333)
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
							onChange={(event) => {
								setPhone(event.target.value);
							}}
						/>
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
							htmlFor="change-password"
							className="label-link"
							style={{ cursor: "pointer" }}
						>
							<Link to="/trocar-senha" className="link-underline">
								Redefinir senha
							</Link>
							{/*<span>
                                    Você receberá um e-mail parar alterar a senha de acesso
                                </span>*/}
						</label>
					</div>

					<div className="input-block">
						<label
							className="label-span label-link"
							htmlFor="send-video"
							style={{ cursor: "pointer" }}
							onClick={() => history.push("/video-curriculo")}
						>
							<Link className="link-underline">
								Enviar vídeo currículo
							</Link>
							<span>
								(Grave seu vídeo currículo e aumente suas
								chances)
							</span>
						</label>

						{videoResume !== "" &&
							videoResume.map((vResume) => {
								return (
									<div className="file-list">
										<FaTrash
											color={"grey"}
											onClick={() => {
												deleteResumeAPI(vResume.hashId);
											}}
										/>

										<FaDownload
											color={"var(--color-font-primary)"}
											onClick={() =>
												downloadResumeAPI(
													vResume.hashId,
													vResume.nomeArquivo
												)
											}
										/>
										<p>{vResume.nomeArquivo}</p>
									</div>
								);
							})}
					</div>

					<ResumesList />

					<div class="display-flex button-send">
						<button
							type="submit"
							className="button button-primary send-form"
						>
							Salvar
						</button>
					</div>
				</form>
			</main>

			<div id="tab-history" className="tab-item display-none">
				<CandidatureBlock />
			</div>

			<div class="display-flex button-send">
				<Link to="/" className="button button-secondary">
					Ver oportunidades
				</Link>
			</div>
		</div>
	);
}

export default CandidateDetails;
