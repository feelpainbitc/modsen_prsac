import React from 'react'

import './DirecttionResult.css'

export const DirectionResult = ({ info, setDirections }) => {
    return (
        <div className="wrapperDirResult">
            <button className="btn" onClick={() => setDirections(null)}>
                x
            </button>
            <div className="info">
                <p>Время:{info.routes[0].legs[0].duration.text}</p>
                <p>Дистанция:{info.routes[0].legs[0].distance.text}</p>
            </div>
        </div>
    )
}
// {result.routes[0].legs[0].distance.text}
// {result.routes[0].legs[0].duration.text}
