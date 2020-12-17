import React, { useState } from "react";
import BackgroundTitle from "../components/background-title/Background-title";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { ShowError, ShowSuccess } from "../services/methods";

const TrocarSenha = () => {
	const [password, setPassword] = useState("");
	const [samePassword, setSamePassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const history = useHistory();
	const alert = useAlert();

	const handleSubmit = (e) => {
		e.preventDefault();
		//try {
		//ShowSuccess("Um email será enviado para você em alguns minutos", alert);
		//history.push("/oportunidades");

		if (password === samePassword) {
			ShowSuccess("Sua senha foi alterada com sucesso", alert);
			history.push("/candidato/:id");
		} else ShowError("Sua senha não confere", alert);
		/*} catch (error) {
			ShowError(
				"Não foi possível encontrar o email informado no nosso banco de dados",
				alert
			);
		}*/
	};

	return (
		<div id="page-candidate-details" className="page-position">
			<BackgroundTitle title={`Alterar senha`} description={""} />

			<main className="display-flex">
				<form className="create-candidate" onSubmit={handleSubmit}>
					<div className="input-block">
						<label htmlFor="password">
							Senha
							<span>Digite sua antiga senha</span>
						</label>

						<input
							id="password"
							value={password}
							placeholder="Senha"
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
							Senha
							<span>Repita sua antiga senha</span>
						</label>

						<input
							id="password"
							value={samePassword}
							placeholder="Senha"
							maxLength="10"
							type="password"
							onChange={(event) => {
								setSamePassword(event.target.value);
							}}
							required
						/>
					</div>
					<div className="input-block">
						<label htmlFor="password">
							Senha
							<span>Digite sua nova senha</span>
						</label>

						<input
							id="password"
							value={newPassword}
							placeholder="Senha"
							maxLength="10"
							type="password"
							onChange={(event) => {
								setNewPassword(event.target.value);
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
							Recuperar senha
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default TrocarSenha;
