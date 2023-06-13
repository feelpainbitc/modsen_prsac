import {React,useCallback,useState,useEffect,useRef} from 'react'


import { GoogleMap,MarkerF } from '@react-google-maps/api';
import s from "./Map.module.css"

const containerStyle = {
    width: '100%',
    height: '100%'
  };


    const defaultOptions={
        panControl:true,
        zoomControl:false,
        mapTypeControl:false,
        scaleControl:false,
        streetViewControl:false,
        rotateControl:false,
        clickableIcons:true,
        keyboardShortcuts:false,
        scrollwheel:true,
        disableDoubleClickZoom:true,
        fullscreenControl:false,
      } 
      


export const Map = ({center}) => {
   const mapRef=useRef(undefined)

  const onLoad = useCallback(function callback(map) {
    mapRef.current=map
  }, [])

  const onUnmount = useCallback(function callback(map) {
    mapRef.current=undefined
  }, [])

  return(<div className={s.container}>
    <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={10}
    onLoad={onLoad}
    onUnmount={onUnmount}
    options={defaultOptions}
    >
        <MarkerF position={center}/>
    </GoogleMap>
    </div>
   )
  }
