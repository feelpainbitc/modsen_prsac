import React from 'react'

import './DirecttionResult.css'

export const DirectionResult = ({ result }) => {
    return (
        <div className="wrapperDirResult">
            <p>Время:12 мин</p>
            <p>Дистанция:2.5 км</p>
        </div>
    )
}
// {result.routes[0].legs[0].distance.text}
// {result.routes[0].legs[0].duration.text}
