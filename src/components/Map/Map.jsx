/*global google*/
import { React, useCallback, useState, useRef, useContext } from 'react'

import {
    GoogleMap,
    MarkerF,
    Circle,
    DirectionsRenderer,
} from '@react-google-maps/api'

import { Context } from '../../context'
import MyPosition from '../../assets/user1.png'
import { fetchDirection } from '../../utils/fetchdir'
import { getMarkerIcon } from '../../helpers/iconFilter'
import { defaultOptions, circleOptions } from '../../config'

import s from './Map.module.css'

const containerStyle = {
    width: '100%',
    height: '100%',
}

export const Map = ({ center, radius, places, showPlace }) => {
    const mapRef = useRef(undefined)
    const [directions, setDirections] = useState()

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
                zoom={12}
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
                            icon={getMarkerIcon(place)}
                            key={i}
                            onClick={() => {
                                fetchDirection(place, center, setDirections)
                            }}
                        />
                    ))}
            </GoogleMap>
        </div>
    )
}
