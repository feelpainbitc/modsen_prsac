import React from 'react'

import s from "./PlaceDetail.module.css"



export const PlaceDetail = ({place}) => {
  return(
    <div className={s.placeDetailContainer}>
        <div className={s.placeDetailImg}>
            <img src={place.photo ? place.photo.images.small.url : "https://thumb.tildacdn.com/tild3562-3265-4238-b634-626664373531/-/resize/366x/-/format/webp/photo.png"} alt="No photo" />
        </div>
        <div className={s.placeDetailInfo}>
            <div className={s.placeDetailHeader}>
                <p>{place.name}</p>
                <p>Rating: {place.rating}</p>
            </div>
            <div className={s.placeDetailBtns}>
                <button>Маршрут</button>
                <button>В избранное</button>
            </div>
        </div>
    </div>
   )
  }
