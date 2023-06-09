import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';


import s from './App.module.css';
import { Map } from './components/Map/Map';


import { AutocompleteCustom } from './components/Autocomplete/AutocompleteCustom';
import { useJsApiLoader,Autocomplete } from '@react-google-maps/api';
import { getBrowserLocation } from './utils/geo';

const API_KEY = process.env.REACT_APP_API_KEY


const defaultValueCenter = {
  lat: 51.507359,
  lng: -0.136439
};
const libraries = ['places']
const google = window.google;




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
      setOriginRef(curLoc)
    })
      .catch((defaultValueCenter) => {
        setCenter(defaultValueCenter)
      });
  }, [])


  const [directionResponse, setDirectionResponse] = useState(null)
  const [distance, setDistance] = useState()
  const [duration, setDuration] = useState()
  const [originRef,setOriginRef]=useState()
  
  const destinationRef = useRef()
  

  // async function calculateRoute() {
  //   if (destinationRef.current.value === '' || originRef.current.value === '') {
  //     return
  //   }
  //   const directionsService = new google.maps.DirectionsService()
  //   const results= await directionsService.route({
  //     origin:originRef,
  //     destination:destinationRef.current.value,
  //     travelMode:google.maps.TravelMode.DRIVING
  //   })
  // }

  return (
    <div>
      <div className={s.calculateRouteContainer}>
        <div className={s.firstStr}>
        <div className={s.inputPlaces}>
        <AutocompleteCustom isLoaded={isLoaded} onSelect={onPlaceSelect}/>
        <AutocompleteCustom isLoaded={isLoaded} onSelect={onPlaceSelect}/>
        </div>
        <div className={s.btnGroup}>
        <button className={s.btnCalc}>Calculate route</button>
        <button className={s.btnCancel}></button>
        </div>
        </div>
        <div className={s.textPlaces}>
        <p>Duration: {}</p>
        <p>Distance: {}</p>
        </div>
      </div>
      <div className={s.addresSearchContainer}>
        <AutocompleteCustom isLoaded={isLoaded} onSelect={onPlaceSelect} ref={destinationRef} />
        <button
          className={s.btn}
          onClick={() => getBrowserLocation().then(currentLocation => { setCenter(currentLocation) })}
        />
        {/* <button onClick={calculateRoute}>Calculate route</button> */}
      </div>
      {isLoaded ? <Map center={center} /> : <h2>Loading...</h2>}
    </div>
  );
}

export default App;
