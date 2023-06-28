import React from 'react'

import './Modal.css'

export const Modal = ({ active, setActive }) => {
    return (
        <div className="wrapper">
            <div className="header"></div>
            <div className="description"></div>
            <div className="btnsgroup">
                <button>В избранное</button>
                <button>Маршрут</button>
            </div>
        </div>
    )
}
