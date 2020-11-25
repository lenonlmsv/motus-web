import React from "react";

//Image
import notfound from '../images/image-not-found.png'

//Router
import {BrowserRouter, Link, useHistory} from 'react-router-dom'

export default function PageNotFound() {

    const history = useHistory();

    const push = () => {
        history.push('/oportunidades')
    }

    return (
        <div style={{
                display:"flex", 
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",
                width:"90vw", 
                maxWidth:"1140px"}}>
            
            <p style={{
                color:"var(--color-font-primary)", 
                fontSize:"2rem"}}>Endereço não encontrado</p>

            <img alt="not-found" src={notfound} 
                style={{
                    margin:"-20px",
                    width:"20rem",
                }}/>

            <button onClick={push} style={{fontSize: '1.5rem'}}className="button button-primary">
                Voltar para oportunidades
            </button>
        </div>
    )
}