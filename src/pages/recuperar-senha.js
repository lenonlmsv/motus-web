import React, { useState } from "react";
import BackgroundTitle from "../components/background-title/Background-title";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { ShowError, ShowSuccess } from "../services/methods";

const RecuperarSenha = () => {
	const [email, setEmail] = useState("");
	const history = useHistory();
	const alert = useAlert();

	const handleSubmit = (e) => {
		e.preventDefault();
		//try {
		ShowSuccess("Um email será enviado para você em alguns minutos", alert);
		history.push("/oportunidades");
		/*} catch (error) {
			ShowError(
				"Não foi possível encontrar o email informado no nosso banco de dados",
				alert
			);
		}*/
	};

	return (
		<div id="page-candidate-details" className="page-position">
			<BackgroundTitle
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
						<Link to="/login" className="button button-secondary">
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
