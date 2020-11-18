import React, { useEffect, useState } from 'react';

//CSS
import './styles/background-title.css';

function BackgroundTitle(props) {
    return (
        <div id="image-background-dotted">
            <div className="div-image-dotted">
                <strong className="div-image-content">{props.title}</strong>
            </div>
            <div className="div-description">
                <p>{props.description}</p>
            </div>
        </div>
    )
}

export default BackgroundTitle;