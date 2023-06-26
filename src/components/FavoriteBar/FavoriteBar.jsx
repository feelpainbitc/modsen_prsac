import React from 'react'

import { FavoriteCard } from '../FavoriteCard/FavoriteCard'

import './FavoriteBar.css'

export const FavoriteBar = ({ active, setActive }) => {
    return (
        <div className={active ? 'wrapper active' : 'wrapper'}>
            <input placeholder="Поиск по избранному..." />
            <h2>Избранное:</h2>
            <div className="list">
                <FavoriteCard />
            </div>
        </div>
    )
}
