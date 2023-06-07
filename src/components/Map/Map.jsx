import React, { useRef } from 'react'

import { GoogleMap } from '@react-google-maps/api'
import s from './Map.module.css'
import { defaultTheme } from './Theme';

/**
* @author
* @function Map
**/

const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

const defaultOptions={
  panControl:true,
  zoomControl:true,
  mapTypeControl:false,
  scaleControl:false,
  streetViewControl:false,
  rotateControl:false,
  clickableIcons:true,
  keyboardShortcuts:false,
  scrollwheel:true,
  disableDoubleClickZoom:true,
  fullScreenControl:false,
  styles:defaultTheme,
} 

export const Map = ({center}) => {

    const mapRef=React.useRef(undefined)

    const onLoad = React.useCallback(function callback(map) {
        mapRef.current=map
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        mapRef.current=undefined
      }, [])
  return(
    <div className={s.container}>
        <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </div>
   )
  }
