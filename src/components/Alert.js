import React from 'react'

import { withAlert } from 'react-alert'

function Alert({m, alert}) {
    return (
        <button onClick={()=> {
            alert.show(m)
        }}> 
            Clique aqui
        </button>
    )
}

export default withAlert() (Alert) 