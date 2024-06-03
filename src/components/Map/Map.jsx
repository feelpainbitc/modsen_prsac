/*global google*/
import { React, useCallback, useState, useRef, Fragment } from 'react'


import {
    GoogleMap,
    MarkerF,
    Circle,
    DirectionsRenderer,
    // DrawingManager,
} from '@react-google-maps/api'

// import { Context } from '../../context'
import { PlaceDescription } from '../PlaceDescription/PlaceDescription'
import MyPosition from '../../assets/user1.png'
import { DirectionResult } from '../DirectionResult/DirectionResult'
import { fetchDirection } from '../../utils/fetchdir'
import { getMarkerIcon } from '../../helpers/iconFilter'
import { defaultOptions } from '../../config'

import s from './Map.module.css'

const containerStyle = {
    width: '100%',
    height: '100%',
}

const circleOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clicable: false,
    draggable: false,
    visible: true,
    zIndex: 10,
    fillOpacity: 0.08,
    strokeColor: 'rgb(119, 118, 10)',
    fillColor: 'rgb(119, 118, 10)',
}


export const Map = ({
    center,
    radius,
    places,
    showPlace,
    placesRest,
    directionsRendererRef,
    setRadius,
    setIsFirstCircle,
    isFirstCircle,
}) => {
    const mapRef = useRef(undefined)
    const onLoad = useCallback(function callback(map) {
        mapRef.current = map
    }, [])
    const onUnmount = useCallback(function callback(map) {
        mapRef.current = undefined
    }, [])

    const clearDirections = () => {
        setDirections(null); // Установите directions в null, чтобы удалить маршрут
    };

    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [directions, setDirections] = useState(null)

  // Создаем объект состояний модальных окон для каждого маркера
  const [markerModalStates, setMarkerModalStates] = useState({});

  // Функция для открытия модального окна маркера по его id
  const openModal = (id) => {
    setMarkerModalStates((prevState) => ({
      ...prevState,
      [id]: true,
    }));
  };

  // Функция для закрытия модального окна маркера по его id
  const closeModal = (id) => {
    setMarkerModalStates((prevState) => ({
      ...prevState,
      [id]: false,
    }));
  };

    return (
        <div className={s.container}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={defaultOptions}
            >
                {/* radius != null && radius !== '' && (isFirstCircle || radius !== 0) */}
                { radius != null && radius !== '' && (isFirstCircle || radius !== 0) && (
                    <>
                    {console.log('Центр: '+center,'Радиус: '+radius,'Тип: '+typeof radius)}
                    <Circle
                        center={center}
                        radius={parseFloat(radius) * 1000}
                        options={circleOptions}
                    />
                    </>
                )}
                {/* { radius != null && radius !== '' && (isFirstCircle || radius !== 0) && (
    <>
        {console.log(center, radius)}
        {radius !== 0 ? (
            <Circle
                center={center}
                radius={parseFloat(radius) * 1000}
                options={circleOptions}
                onClick={}
            />
        ) : (
            DrawingManager.setMap(null) // или вызов другой функции, которая удаляет круг с карты
        )}
    </>
)} */}
                <MarkerF position={center} icon={MyPosition} />
                {directions && <DirectionsRenderer directions={directions} />}
                    {showPlace !== false &&
                        radius !== undefined &&
                        places.map((place) => {
                            const isOpen = markerModalStates[place.location_id] || false;

                            return (
                            <Fragment key={place.location_id}>
                                <MarkerF
                                position={{
                                    lat: Number(place.latitude),
                                    lng: Number(place.longitude),
                                }}
                                title={place.name}
                                icon={getMarkerIcon(place)}
                                onClick={() => {
                                    openModal(place.location_id);
                                    console.log(place);
                                }}
                                />
                                <PlaceDescription
                                isOpen={markerModalStates[place.location_id]}
                                onClose={() => closeModal(place.location_id)}
                                place={place}
                                center={center}
                                setDirections={setDirections}
                                directionsRendererRef={directionsRendererRef}
                                />
                            </Fragment>
                            );
                        })}
                        {directions !== null && (
                    <DirectionResult
                        info={directions}
                        setDirections={setDirections}
                        onClose={() => {
                            clearDirections(); // Вызовите функцию для удаления маршрута при закрытии модального окна
                            if (directionsRenderer) {
                                directionsRenderer.setMap(null); // Удаление DirectionsRenderer из карты
                            }
                        }}
                        directionsRendererRef={directionsRendererRef}
                    />
                )}
                   
                {/* {showPlace != false &&
                    radius != undefined &&
                    placesRest.map((place, i) => (
                        <MarkerF
                            position={{
                                lat: Number(place.latitude),
                                lng: Number(place.longitude),
                            }}
                            title={place.name}
                            icon={getMarkerIcon(place)}
                            key={i}
                            onClick={() => {
                                openPopup()
                                console.log('click')
                                // fetchDirection(place, center, setDirections)
                            }}
                        />
                    ))} */}
            </GoogleMap>
        </div>
    )
}
