import {React,useCallback,useState,useEffect,useRef} from 'react'


import { GoogleMap,MarkerF,Circle } from '@react-google-maps/api';
import s from "./Map.module.css"
import { defaultTheme } from './Theme';

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
        styles:defaultTheme,
      } 
      


export const Map = ({center,radius}) => {
  
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
        {radius!=undefined && <Circle center={center} radius={radius*1000} options={circleOptions}/>}
        <MarkerF position={center} />
    </GoogleMap>
    </div>
   )
  }


const circleOptions={
  strokeOpacity:0.5,
  strokeWeight:2,
  clicable:false,
  draggable:false,
  visible:true,
  zIndex:10,
  fillOpacity:0.05,
  strokeColor:"#1569c2",
  fillColor:"080096",
}
