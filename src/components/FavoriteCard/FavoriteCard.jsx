import React from 'react'

import zaglywka from '../../assets/zagluwka.png'
import favorite from '../../assets/favourites.png'

import s from './FavoriteCard.module.css'

export const FavoriteCard = (props) => {
    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <img src={zaglywka} alt="Will be..." />
                <h2>Фантаcмагарический музей им. П.М. Машерова</h2>
            </div>
            <div className={s.description}>
                Lörem ipsum jere. Intrabel peraktiv pävufåsk läslov pide. Exon
                prelogi. Någonstansare begöpp. Homoadoption tesände keck såsom
                köttrymden. Epigen digon fast svennefiera håven postfaktisk.
                Atomslöjd defåling nigovena tegt i platt-tv. Sextremism
                julgranssyndrom. Rit-avdrag fyr, jukanat don. Apfälla menskopp
                eftersom spetät senessa inklusive mepaktiga. Bloggbävning
                makroligt spepp gönas. Sitskate epir tidsfönster. Hjärtslagslag
                defånera. Neck röstsamtal möbelhund. Hexaledes ryggsäcksmodellen
                hikikomori när stenomiheten täpos. Du kan vara drabbad.
            </div>
            <button>Маршрут</button>
        </div>
    )
}
