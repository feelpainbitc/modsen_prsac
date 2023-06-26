/*global google*/
import { React, useCallback, useState, useRef } from 'react'

import {
    GoogleMap,
    MarkerF,
    Circle,
    DirectionsRenderer,
} from '@react-google-maps/api'

import MyPosition from '../../assets/user1.png'
import { Modal } from '../Modal/Modal'

import s from './Map.module.css'
import { defaultTheme } from './Theme'

const containerStyle = {
    width: '100%',
    height: '100%',
}

const marker = {
    lat: 53.68387599620336,
    lng: 23.843639163214675,
}

const defaultOptions = {
    panControl: true,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    clickableIcons: true,
    keyboardShortcuts: false,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    fullscreenControl: false,
    styles: defaultTheme,
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

export const Map = ({ center, radius, places, showPlace }) => {
    const mapRef = useRef(undefined)
    const [directions, setDirections] = useState()

    const fetchDirection = (place, center) => {
        if (!place) return

        const service = new google.maps.DirectionsService()
        service.route(
            {
                origin: center,
                destination: {
                    lat: Number(place.latitude),
                    lng: Number(place.longitude),
                },
                travelMode: google.maps.TravelMode.WALKING,
            },
            (result, status) => {
                if (status === 'OK' && result) {
                    setDirections(result)
                }
            }
        )
    }

    const onLoad = useCallback(function callback(map) {
        mapRef.current = map
    }, [])

    const onUnmount = useCallback(function callback(map) {
        mapRef.current = undefined
    }, [])

    return (
        <div className={s.container}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={defaultOptions}
            >
                {radius != undefined && (
                    <Circle
                        center={center}
                        radius={radius * 1000}
                        options={circleOptions}
                    />
                )}
                <MarkerF position={center} icon={MyPosition} />
                <MarkerF position={marker} />
                {directions && <DirectionsRenderer directions={directions} />}
                {showPlace != false &&
                    radius != undefined &&
                    places.map((place, i) => (
                        <MarkerF
                            position={{
                                lat: Number(place.latitude),
                                lng: Number(place.longitude),
                            }}
                            title={place.name}
                            key={i}
                            onClick={() => {
                                fetchDirection(place, center)
                            }}
                        />
                    ))}
            </GoogleMap>
        </div>
    )
}
