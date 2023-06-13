/*global google*/
import React, { useCallback, useEffect, useRef,useSelector } from 'react';
import { useState } from 'react';


import s from './App.module.css';
import { Map } from './components/Map/Map';


import { AutocompleteCustom } from './components/Autocomplete/AutocompleteCustom';
import { useJsApiLoader,DirectionsRenderer,Autocomplete } from '@react-google-maps/api';
import { getBrowserLocation } from './utils/geo';

const API_KEY = process.env.REACT_APP_API_KEY


const defaultValueCenter = {
  lat: 51.507359,
  lng: -0.136439
};
const libraries = ['places']





function App() {

  const [center, setCenter] = React.useState(defaultValueCenter)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries
  })

  const onPlaceSelect = React.useCallback(
    (coordinates) => {
      setCenter(coordinates)
    },
    [],
  )


  React.useEffect(() => {
    getBrowserLocation().then((curLoc) => {
      setCenter(curLoc)
    })
      .catch((defaultValueCenter) => {
        setCenter(defaultValueCenter)
      });
  }, [])


  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState()
  const [duration, setDuration] = useState()
  
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()

  async function calculateRoute() {
   
    if (destinationRef.current.value === '' || originRef.current.value === '') {
      return
    }
    const directionsService = new google.maps.DirectionsService()
    const results= await directionsService.route({
      origin:originRef.current.value,
      destination:destinationRef.current.value,
      travelMode:google.maps.TravelMode.DRIVING
    })
    directionsService.route({
      origin:originRef.current.value,
      destination:destinationRef.current.value,
      travelMode:google.maps.TravelMode.DRIVING
    })
    setDirectionsResponse(results)
    console.log(directionsResponse)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute(){
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value=''
    destinationRef.current.value=''
  }
  const formattedOrigin = originRef
  const formattedDestination = destinationRef

  return (
    <div>
      <div className={s.calculateRouteContainer}>
        <div className={s.firstStr}>
        <div className={s.inputPlaces}>
        <Autocomplete>
          <input 
          type='text' placeholder='Origin' ref={originRef}
          />
          </Autocomplete>
        <Autocomplete>
          <input
          type='text' placeholder='Destination' ref={destinationRef}
          />
          </Autocomplete>
        </div>
        <div className={s.btnGroup}>
        <button className={s.btnCalc} onClick={calculateRoute}>Calculate route</button>
        <button className={s.btnCancel} onClick={clearRoute}></button>
        </div>
        </div>
        <div className={s.textPlaces}>
        <p>Duration: {duration}</p>
        <p>Distance: {distance}</p>
        </div>
      </div>
      <div className={s.addresSearchContainer}>
        <AutocompleteCustom isLoaded={isLoaded} onSelect={onPlaceSelect} ref={destinationRef} />
        <button
          className={s.btn}
          onClick={() => getBrowserLocation().then(currentLocation => { setCenter(currentLocation)})}
        />
        {/* <button onClick={calculateRoute}>Calculate route</button> */}
      </div>
      {isLoaded ? <Map center={center} origin={formattedOrigin} destination={formattedDestination}/> : <h2>Loading...</h2>}
    </div>
  );
}

export default App;
