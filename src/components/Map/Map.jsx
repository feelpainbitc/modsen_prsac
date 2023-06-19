/*global google*/
import {React,useCallback,useState,useEffect,useRef} from 'react'


import { GoogleMap,MarkerF,Circle,Geocoder } from '@react-google-maps/api';
import s from "./Map.module.css"
import { defaultTheme } from './Theme';
import {getGeocode, getLatLng,} from "use-places-autocomplete";

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

      const circleOptions={
        strokeOpacity:0.5,
        strokeWeight:2,
        clicable:false,
        draggable:false,
        visible:true,
        zIndex:10,
        fillOpacity:0.08,
        strokeColor:"#C71585",
        fillColor:"080096",
      }
      
      
var geocoder

export const Map = ({center,radius,places}) => {
  
   const mapRef=useRef(undefined)


   let request={
    location: center,
    radius:radius,
    type:['restaurant']
  }



  const onLoad = useCallback(function callback(map) {
    mapRef.current=map
  }, [])

  const onUnmount = useCallback(function callback(map) {
    mapRef.current=undefined
  }, [])

  geocoder = new google.maps.Geocoder();

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
      {radius!=undefined && <Circle center={center} radius={radius*1000} options={circleOptions}/>}
      <MarkerF position={center} title="my pos"/>
      {places?.map((place,i)=>(
        console.log({lat:place.latitude,lng:place.longitude}),
          <MarkerF position={{lat:Number(place.latitude),lng:Number(place.longitude)}} title={place.name} key={i}/>
      ))}
    </GoogleMap>
  </div>
   )
  }


