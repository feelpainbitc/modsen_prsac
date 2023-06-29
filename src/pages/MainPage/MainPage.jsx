/*global google*/
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useJsApiLoader } from '@react-google-maps/api'
import { useNavigate } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'

import { removeUser } from '../../store/slices/userSlice'

import { Map } from '../../components/Map/Map'
import { getPlacesData } from '../../utils/getplaces.js'
import { PlaceDetail } from '../../components/PlaceDetail/PlaceDetail.jsx'
import { Autocomplete } from '../../components/Autocomplete/Autocomplete.jsx'
import { useAuth } from '../../hooks/use-auth.js'
import { Sidebar } from '../../components/Sidebar/Sidebar.jsx'
import { FavoriteBar } from '../../components/FavoriteBar/FavoriteBar.jsx'
import { DirectionResult } from '../../components/DirectionResult/DirectionResult'
import { Context } from '../../context'
import { defaultValueCenter, libraries } from '../../config'

import Logo from '../../assets/logo.png'

import s from './MainPage.module.css'

const API_KEY = process.env.REACT_APP_API_KEY

export const MainPage = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPlace, setShowPlace] = useState(false)
    const [radius, setRadius] = useState(null)
    const [center, setCenter] = useState(defaultValueCenter)
    const [places, setPlaces] = useState([])
    const [myPos, setMyPos] = useState(false)
    const [menuActive, setMenuActive] = useState(false)
    const [favoriteActive, setFavoriteActive] = useState(false)
    const { isAuth } = useAuth()
    const [dirActive, setDirActive] = useState(false)
    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     console.log(center)
    //     console.log(showPlace)
    //     getPlacesData(center, radius).then((data) => {
    //         console.log(data)
    //         if (showPlace == true) {
    //             setPlaces(data)
    //         }
    //     })
    // }, [showPlace])

    const onPlaceSelect = useCallback((coordinates) => {
        setCenter(coordinates)
    }, [])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyDaY4S9bDqrvZZUGwJvp0dnPE4IHNElF9M',
        libraries,
    })

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
                setCenter({ lat: latitude, lng: longitude })
            },
            setMyPos(false)
        )
    }, [myPos])

    return isAuth ? (
        <Context.Provider value={{}}>
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
                        onClick={() => setMyPos(true) && setLoading(true)}
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
                />
                <FavoriteBar
                    active={favoriteActive}
                    setActive={setFavoriteActive}
                />
                {/* <DirectionResult /> */}
                <ClipLoader
                    color="#000000"
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </Context.Provider>
    ) : (
        navigate('/login')
    )
}
