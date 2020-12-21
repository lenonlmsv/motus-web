import React, { useState } from "react";
import BackgroundTitle from "../components/background-title/Background-title";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { ShowError, ShowSuccess, changePassword } from "../services/methods";
import api from "../services/api";

const TrocarSenha = () => {
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [newConfirmedPassword, setNewConfirmedPassword] = useState("");
	const history = useHistory();
	const alert = useAlert();

	const callBackError = (error) => {};

	const handleSubmit = async (e) => {
		e.preventDefault();
		//try {
		//ShowSuccess("Um email será enviado para você em alguns minutos", alert);
		//history.push("/oportunidades");

		if (newConfirmedPassword === newPassword) {
			try {
				api.defaults.headers.post["Content-Type"] =
					"multipart/form-data"; //USAR FORMATO DE ARQUIVO

				const data = new FormData();
				data.append("antigaSenha", password);
				data.append("confirmacaoSenha", newConfirmedPassword);
				data.append("novaSenha", newPassword);

				const response = await api.post(
					"candidato/alterar-senha",
					data
				);

				ShowSuccess(response.data.menssage, alert);
				//console.log();
				history.push("/candidato/:id");
				//return response.data;
			} catch (err) {
				const json = JSON.stringify(err);
				console.log("msg de erro");
				console.log(err.data);
				console.log(json);
				//console.log(response);
				//return err;
			}
		} else {
			ShowError("Sua nova senha não confere com a confirmação");
		}
	};

	return (
		<div id="page-candidate-details" className="page-position">
			<BackgroundTitle title={`Alterar senha`} description={""} />

			<main className="display-flex">
				<form className="create-candidate" onSubmit={handleSubmit}>
					<div className="input-block">
						<label htmlFor="password">
							Senha antiga
							<span>Digite sua antiga senha</span>
						</label>

						<input
							id="password"
							value={password}
							placeholder="Sua antiga senha"
							maxLength="10"
							type="password"
							onChange={(event) => {
								setPassword(event.target.value);
							}}
							required
						/>
					</div>
					<div className="input-block">
						<label htmlFor="password">
							Nova senha
							<span>Digite sua nova senha</span>
						</label>

						<input
							id="password"
							value={newPassword}
							placeholder="Informe sua nova senha"
							maxLength="10"
							type="password"
							onChange={(event) => {
								setNewPassword(event.target.value);
							}}
							required
						/>
					</div>
					<div className="input-block">
						<label htmlFor="password">
							Confirme nova senha
							<span>Repita sua nova senha</span>
						</label>

						<input
							id="password"
							value={newConfirmedPassword}
							placeholder="Confirme sua nova senha"
							maxLength="10"
							type="password"
							onChange={(event) => {
								setNewConfirmedPassword(event.target.value);
							}}
							required
						/>
					</div>
					<div className="submit-button">
						<Link
							to="/candidato/:id"
							className="button button-secondary"
						>
							Voltar
						</Link>
						<button
							type="submit"
							className="button button-primary send-form"
						>
							Alterar senha
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default TrocarSenha;
