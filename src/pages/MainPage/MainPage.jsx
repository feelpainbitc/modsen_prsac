/*global google*/
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useJsApiLoader } from '@react-google-maps/api'
import { useNavigate } from 'react-router-dom'

import { removeUser } from '../../store/slices/userSlice'

import { Map } from '../../components/Map/Map'
import { getBrowserLocation } from '../../components/utils/geo.js'
import { getPlacesData } from '../../components/utils/getplaces.js'
import { PlaceDetail } from '../../components/PlaceDetail/PlaceDetail.jsx'
import { Autocomplete } from '../../components/Autocomplete/Autocomplete.jsx'
import { useAuth } from '../../hooks/use-auth.js'
import { Sidebar } from '../../components/Sidebar/Sidebar.jsx'
import { FavoriteBar } from '../../components/FavoriteBar/FavoriteBar.jsx'

import Logo from '../../assets/logo.png'

import s from './MainPage.module.css'

const API_KEY = process.env.REACT_APP_API_KEY

const defaultValueCenter = {
    lat: 53.669353,
    lng: 23.813131,
}
const libraries = ['places']

const placesList = [
    {
        name: 'Madarela',
        rating: '3.5',
        description:
            'loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem',
        photo: 'https://media-cdn.tripadvisor.com/media/photo-l/11/58/e0/2a/photo0jpg.jpg',
    },
    {
        name: 'Madarela',
        rating: '3.5',
        description: 'loremloremloremloremloremloremlorem',
        photo: 'https://media-cdn.tripadvisor.com/media/photo-l/11/58/e0/2a/photo0jpg.jpg',
    },
    {
        name: 'Madarela',
        rating: '3.5',
        description: 'loremloremloremloremloremloremlorem',
        photo: 'https://media-cdn.tripadvisor.com/media/photo-l/11/58/e0/2a/photo0jpg.jpg',
    },
    {
        name: 'Madarela',
        rating: '3.5',
        description: 'loremloremloremloremloremloremlorem',
        photo: 'https://media-cdn.tripadvisor.com/media/photo-l/11/58/e0/2a/photo0jpg.jpg',
    },
]

export const MainPage = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPlace, setShowPlace] = useState(false)
    const [radius, setRadius] = useState(null)
    const [center, setCenter] = useState(defaultValueCenter)
    const [places, setPlaces] = useState([])
    const [menuActive, setMenuActive] = useState(false)
    const [favoriteActive, setFavoriteActive] = useState(false)

    useEffect(() => {
        console.log(center)
        console.log(showPlace)
        getPlacesData(center, radius).then((data) => {
            console.log(data)
            if (showPlace == true) {
                setPlaces(data)
            }
        })
    }, [showPlace])

    const onPlaceSelect = useCallback((coordinates) => {
        setCenter(coordinates)
    }, [])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDaY4S9bDqrvZZUGwJvp0dnPE4IHNElF9M',
        libraries,
    })

    const { isAuth } = useAuth()
    const [directions, setDirections] = useState()
    return isAuth ? (
        <div className={s.container}>
            <div className={s.mainMenu}>
                <img src={Logo} alt="Logo" className={s.logo} />
                <div className={s.btns}>
                    <button
                        className={s.btnsFind}
                        onClick={() => setMenuActive(!menuActive)}
                    ></button>
                    <button
                        className={s.btnsFavourite}
                        onClick={() => setFavoriteActive(!favoriteActive)}
                    ></button>
                </div>
                <button
                    className={s.logout}
                    onClick={() => dispatch(removeUser())}
                ></button>
            </div>
            {/* <div className={s.sideBar}>
                <p className={s.logo}>4EX MAP</p>
                <div className={s.radiusInput}>
                    <p className={s.inputTop}>По какому радиусу будет поиск?</p>
                    <input
                        placeholder="Введите радиус..."
                        value={radius}
                        onChange={(e) => setRadius(e.target.value)}
                        type="number"
                        className={s.sideBarInput}
                    />
                    <button
                        className={s.btnshow}
                        onClick={() => setShowPlace(true)}
                    >
                        Показать
                    </button>
                </div>
                <div className={s.btngroup}>
                    <ul>
                        <li>Избранное</li>
                        <li>Контакты</li>
                    </ul>
                </div>
                <div className={s.placeDetailsList}>
                    {places?.map((place, i) => (
                        <PlaceDetail place={place} />
                    ))}
                </div>
                <div className={s.btnloginout}>
                    <button onClick={() => dispatch(removeUser())}>
                        Выйти
                    </button>
                </div>
            </div> */}
            <div className={s.mapContainer}>
                {isLoaded ? (
                    <Map
                        className={s.map}
                        center={center}
                        places={places}
                        showPlace={showPlace}
                        radius={radius}
                    />
                ) : (
                    <h2>Loading...</h2>
                )}
                <button
                    className={s.btn}
                    onClick={() =>
                        getBrowserLocation().then((currentLocation) => {
                            setCenter(currentLocation)
                        })
                    }
                />
            </div>
            <Sidebar
                active={menuActive}
                setActive={setMenuActive}
                isLoaded={isLoaded}
                onSelect={onPlaceSelect}
                showPlace={setShowPlace}
                activePlaces={showPlace}
                radius={radius}
                setRadius={setRadius}
                places={places}
                center={center}
                setDirections={setDirections}
            />
            <FavoriteBar
                active={favoriteActive}
                setActive={setFavoriteActive}
            />
        </div>
    ) : (
        navigate('/login')
    )
}
