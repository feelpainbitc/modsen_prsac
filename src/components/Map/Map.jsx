import React, { useRef } from 'react'

import { GoogleMap, MarkerF} from '@react-google-maps/api'
import s from './Map.module.css'
import { defaultTheme } from './Theme';
import { CurrentLocationMarker } from '../CurrentLocationMarker/CurrentLocationMarker';

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
  fullscreenControl:false,
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
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
            <MarkerF  
            position={center}
            />
      </GoogleMap>

     
    </div>
   )
  }
