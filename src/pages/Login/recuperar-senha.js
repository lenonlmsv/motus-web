import React, { useState } from "react";
import TituloPagina from "../ComponentesGlobais/TituloPagina/TituloPagina";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { ShowError, ShowSuccess } from "../../services/methods";
import api from "../../services/api";

const RecuperarSenha = () => {
	const [email, setEmail] = useState("");
	const history = useHistory();
	const alert = useAlert();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			api.defaults.headers.post["Content-Type"] = "multipart/form-data"; //USAR FORMATO DE ARQUIVO

			const data = new FormData();
			data.append("email", email);

			const response = await api.post("candidato/esqueci-senha", data);

			ShowSuccess(response.data.menssage, alert);
			history.push("/oportunidades");
		} catch (error) {
			const json = JSON.stringify(error);
			//console.log(error);
			//console.log(json);
			ShowError(
				//"Não foi possível encontrar o email informado no nosso banco de dados",
				error.response.data.menssage,
				alert
			);
		}
	};

	return (
		<div id="page-candidate-details" className="page-position">
			<TituloPagina
				title={`Recuperação de senha`}
				description={"Insira o email utilizando para criar sua conta"}
			/>

			<main className="display-flex">
				<form className="create-candidate" onSubmit={handleSubmit}>
					<div className="input-block">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							placeholder="candidato@email.com"
							maxLength="40"
							onChange={(event) => {
								setEmail(event.target.value);
							}}
							value={email}
							required
						/>
					</div>
					<div className="submit-button">
						<Link
							to="/oportunidades"
							className="button button-secondary"
						>
							Voltar
						</Link>
						<button
							type="submit"
							className="button button-primary send-form"
						>
							Recuperar senha
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default RecuperarSenha;
