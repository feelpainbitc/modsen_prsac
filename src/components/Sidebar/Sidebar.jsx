import React from 'react'


import { Autocomplete } from '../Autocomplete/Autocomplete'
import lypa from '../../assets/lypa.png'
import arrow from '../../assets/arrowsidebar.png'
import './Sidebar.css'

import { PlaceDetail } from '../PlaceDetail/PlaceDetail'

export const Sidebar = ({
    active,
    setActive,
    isLoaded,
    onSelect,
    setShowPlace,
    showPlace,
    radius,
    setRadius,
    places,
    activePlaces,
    center,
}) => {

    return (
        <div className={active ? 'wrapper active' : 'wrapper'}>
            <div className="autocomplete">
                <Autocomplete isLoaded={isLoaded} onSelect={onSelect} />
            </div>
            <div className="findbar">
                <p>Искать:</p>
                <div className="radiocheck">
                    <input type="radio" name="choice" id="choice1"></input>
                    <label htmlFor="choice1">Рестораны</label>
                    <input
                        type="radio"
                        name="choice"
                        id="choice2"
                        checked
                    ></input>
                    <label htmlFor="choice2">Развлечения</label>
                    <input type="radio" name="choice" id="choice3"></input>
                    <label htmlFor="choice3">Отели</label>
                </div>
                <p>В радиусе:</p>
                <div className="inputmenu">
                    <input
                        placeholder="Pадиус..."
                        type="number"
                        className="sideBarInput"
                        value={radius}
                        onClick={()=>setRadius(0.001)}
                        onChange={(e) =>{
                            const value = e.target.value.trim(); // Убираем пробелы в начале и конце
                            const valRadius=value;
                            valRadius==='' ? setRadius(0) : setRadius(parseFloat(valRadius))
                        } }/>
                    <p>км</p>
                </div>
                <button
                    className="sidebarhide"
                    onClick={() => setActive(false)}
                >
                    <img src={arrow} alt="..." />
                </button>
                <div className="list">
                    Найденно:
                    {places?.map((place, i) => (
                        <PlaceDetail place={place} center={center} />
                    ))}
                </div>
                <div className="btngroup">
                <button className="btnshow" onClick={() => {setShowPlace(true); console.log(showPlace)}}>
                    <img src={lypa} alt="l" />
                </button>
                <button className="btnshow">Очистить</button>
                </div>
            </div>
        </div>
    )
}
