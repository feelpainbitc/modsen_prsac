import React from 'react'

import zaglywka from '../../assets/zagluwka.png'
import { fetchDirection } from '../../utils/fetchdir'

import s from './PlaceDetail.module.css'

export const PlaceDetail = ({ place, center, setDirections }) => {
    return (
        <div className={s.placeDetailContainer}>
            <div className={s.placeDetailImg}>
                <img
                    src={
                        place.photo
                            ? place.photo.images.small.url
                            : { zaglywka }
                    }
                    alt="No photo"
                />
            </div>
            <div className={s.placeDetailInfo}>
                <div className={s.placeDetailHeader}>
                    <h3>{place.name}</h3>
                    <h4>{place.rating}</h4>
                </div>
                <div className={s.placeDetailBtns}>
                    <button
                        onClick={() => {
                            fetchDirection(place, center, setDirections)
                        }}
                    >
                        Маршрут
                    </button>
                    <button>В избранное</button>
                </div>
            </div>
        </div>
    )
}
