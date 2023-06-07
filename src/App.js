import React, { useCallback } from 'react';
import { useState } from 'react';
import s from './App.module.css';
import { Autocomplete } from './components/Autocomplete/Autocomplete';
import { Map } from './components/Map/Map';
import { useJsApiLoader } from '@react-google-maps/api';

const API_KEY=process.env.REACT_APP_API_KEY

const defaultValueCenter={
  lat:54.30920403493205,
  lng: 26.87096111598955
};

const libraries=['places']

function App() {
  const [center,setCenter]=React.useState(defaultValueCenter)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY,
    libraries
  })

  const onPlaceSelect=React.useCallback(
    (coordinates)=>{
      setCenter(coordinates)
    },
    [],
  )

  return (
    
    <div>
      <div className={s.addresSearchContainer}>
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect}/>
      </div>
      {isLoaded ? <Map center={center}/> : <h2>Loading...</h2>}
    </div>
  );
}

export default App;
