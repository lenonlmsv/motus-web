import React from 'react';

//CSS
import './styles/page-footer.css'

//Image 
import ImageSys from './images/sys-image-footer.png'


function PageFooter() { 
    return (
            <footer id="page-footer">
                <div className="div-footer">
                    <div>
                        <div className="div-info">
                            <strong>São Paulo | Matriz</strong>
                            <p>R. Manoel A. Ferreirinha, 671</p>
                            <p>Vila Gerty • SCS/SP • CEP 09580-020</p>
                        </div>

                        <div className="div-info">
                            <strong>Rio de Janeiro | Filial</strong>
                            <p>Av. Abelardo Bueno, 600 – Bl. 1B / sl. 101</p>
                            <p>Barra da Tijuca • RJ/RJ • CEP 22775-023</p>
                        </div>

                        <strong>corp@sysmi.com.br | +55 21 2151 1684</strong> 
                    </div>
                    
                    <div className="div-image">
                        <img src={ImageSys} alt="Sys Logo"/>
                    </div>
                </div>

                <div className="div-copyright">
                    <p>Copyright © 2019 | Todos os direitos reservados</p>
                </div>
            </footer>
    )
}

export default PageFooter;