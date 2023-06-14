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
  const [radius,setRadius]=useState(null)
  const [center, setCenter] = useState(defaultValueCenter)
  const onPlaceSelect = useCallback(
    (coordinates) => {
      setCenter(coordinates)
    },
    [],
  )
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ,
    libraries
  })
  const onBtnClickHandler=()=>{
    console.log(radius)
  }
return(
  <div className={s.container}>
    <div className={s.sideBar}>
      <h1>4EX MAP</h1>
      <div>
      <p>По какому радиусу будет поиск?</p>
      <input placeholder='Radius?' value={radius} onChange={(e)=>setRadius(e.target.value)} type='number' className={s.sideBarInput}/>
      </div>
    </div>
  <div className={s.mapContainer}>
  <div className={s.addresSearchContainer}>
  <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect}/>
  </div>
  {isLoaded ?  <Map className={s.map} center={center} radius={radius}/> : <h2>Loading...</h2>}
  <button
    className={s.btn}
    onClick={() => getBrowserLocation().then(currentLocation => { setCenter(currentLocation)})}
    />
  </div>
  </div>
);
}

export default App;