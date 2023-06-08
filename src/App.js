import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import s from './App.module.css';
import { Autocomplete } from './components/Autocomplete/Autocomplete';
import { Map } from './components/Map/Map';
import { useJsApiLoader } from '@react-google-maps/api';
import { getBrowserLocation } from './utils/geo';

const API_KEY=process.env.REACT_APP_API_KEY

const defaultValueCenter={
  lat:51.507359,
  lng: -0.136439
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

  const btnCurPosition=React.useCallback(
    (curLoc)=>{
      setCenter(curLoc)
    }
  )
    React.useEffect(()=>{
      getBrowserLocation().then((curLoc)=>{
        setCenter(curLoc)
      })
      .catch((defaultValueCenter)=>{
        setCenter(defaultValueCenter)
      });
    },[])
  return (
    
    <div>
      <div className={s.addresSearchContainer}>
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect}/>
        <button 
        className={s.btn}
        onClick={()=>btnCurPosition}
        />
      </div>
      {isLoaded ? <Map center={center}/> : <h2>Loading...</h2>}
   
    </div>
  );
}

export default App;
