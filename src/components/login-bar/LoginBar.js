import React from "react";

//Router dom
<<<<<<< HEAD
import { Link } from 'react-router-dom'
=======
import { useHistory, Link } from "react-router-dom";
>>>>>>> 330dbaa0781e51bf3a3bf56854996518d71c3510

//Contex
import { connect } from "react-redux";

//CSS
import "./styles/login-bar.css";

//Components
<<<<<<< HEAD
import {getHashId} from '../../services/auth';
=======
import { getHashId, getUserName } from "../../services/auth";
>>>>>>> 330dbaa0781e51bf3a3bf56854996518d71c3510

function logoutREDUX() {
	return {
		type: "LOGOUT",
	};
}

<<<<<<< HEAD
function LoginBar({isLogged, dispatch}) {    
    const hashId = getHashId();

    console.log(isLogged)

    if(isLogged.auth) {
        return (
            <div id="login-bar">
                <div className="div-limited display-flex">
                    <p className="hide-long-content">{`Candidato(a) ${isLogged.userName}`}</p>
                </div>
                
                <div className="logout-options">
                    <Link to={`/candidato/${hashId}`}>
                        {"Meus dados |"}
                    </Link>             

                    <Link onClick={() => {dispatch(logoutREDUX())}} className="logout-button">
                        {"Logout"}
                    </Link>
                </div>
            </div>
        )
    }

    else {
        return (
            <div>
                <Link to='/login' className='button button-primary'>Login</Link>
            </div>
        )
    }
}

export default connect(state => ({isLogged: state}))(LoginBar);
=======
function LoginBar({ isLogged, dispatch }) {
	const history = useHistory();

	const hashId = getHashId();
	const userName = getUserName();

	if (isLogged) {
		return (
			<div id="login-bar">
				<div className="div-limited display-flex">
					<p className="hide-long-content">{`Candidato(a) ${userName}`}</p>
				</div>

				<div className="logout-options">
					<Link to={`/candidato/${hashId}`}>{"Meus dados |"}</Link>

					<Link
						onClick={() => {
							dispatch(logoutREDUX());
						}}
						className="logout-button"
					>
						{"Logout"}
					</Link>
				</div>
			</div>
		);
	} else {
		return (
			<div>
				<Link to="/login" className="button button-primary">
					Login
				</Link>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { isLogged: state.IsLogged };
};

export default connect(mapStateToProps)(LoginBar);
>>>>>>> 330dbaa0781e51bf3a3bf56854996518d71c3510
