/*global google*/
import React, { useCallback, useEffect, useRef,useSelector } from 'react';
import { useState } from 'react';


import s from './App.module.css';
import { Map } from './components/Map/Map';
import { getBrowserLocation } from './components/utils/geo';



import { useJsApiLoader } from '@react-google-maps/api';
import { Autocomplete } from './components/Autocomplete/Autocomplete';


const API_KEY = process.env.REACT_APP_API_KEY


const defaultValueCenter = {
  lat: 51.507359,
  lng: -0.136439
};
const libraries = ['places']





function App() {
  const [center, setCenter] = useState(defaultValueCenter)
  const onPlaceSelect = useCallback(
    (coordinates) => {
      setCenter(coordinates)
    },
    [],
  )
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries
  })
return(
  <div>
  <div className={s.addresSearchContainer}>
  <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect}/>
  </div>
 
  {isLoaded ?  <Map center={center}/> : <h2>Loading...</h2>}
  <button
    className={s.btn}
    onClick={() => getBrowserLocation().then(currentLocation => { setCenter(currentLocation)})}
    />
  </div>
);
}

export default App;
