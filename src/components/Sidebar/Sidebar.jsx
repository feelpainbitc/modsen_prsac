import React from 'react'

import { Autocomplete } from '../Autocomplete/Autocomplete'
import lypa from '../../assets/lypa.png'
import arrow from '../../assets/arrowsidebar.png'
import './Sidebar.css'

export const Sidebar = ({
    active,
    setActive,
    isLoaded,
    onSelect,
    showPlace,
    radius,
    setRadius,
}) => {
    return (
        <div className={active ? 'wrapper active' : 'wrapper'}>
            <div className="autocomplete">
                <Autocomplete isLoaded={isLoaded} onSelect={onSelect} />
            </div>
            <div className="findbar">
                <p>Искать:</p>
                <p>В радиусе:</p>
                <div className="inputmenu">
                    <input
                        placeholder="Pадиус..."
                        type="number"
                        className="sideBarInput"
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                    />
                    <p>км</p>
                </div>
                <button
                    className="sidebarhide"
                    onClick={() => setActive(false)}
                >
                    <img src={arrow} alt="..." />
                </button>
                <button className="btnshow" onClick={() => showPlace(true)}>
                    <img src={lypa} alt="l" />
                </button>
            </div>
        </div>
    )
}
