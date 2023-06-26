/*global google*/
import React, { useCallback,useEffect } from 'react';
import { useState } from 'react';
import {redirect} from 'react-router-dom';
import {useDispatch} from "react-redux"
import {removeUser} from "../store/slices/userSlice.js"

import s from './MainPage.module.css';
import { Map } from '../components/Map/Map';
import { getBrowserLocation } from '../components/utils/geo';
import { getPlacesData } from '../components/utils/getplaces';
import { PlaceDetail } from '../components/PlaceDetail/PlaceDetail';
import { Autocomplete } from '../components/Autocomplete/Autocomplete';
import {useAuth} from '../hooks/use-auth.js';


import { useJsApiLoader } from '@react-google-maps/api';



const API_KEY = process.env.REACT_APP_API_KEY


const defaultValueCenter = {
  lat: 53.669353,
  lng: 23.813131,
};
const libraries = ['places']


const placesList=[
  {name:'Madarela', rating:'3.5',description:'loremloremloremloremloremloremlorem',photo:'https://media-cdn.tripadvisor.com/media/photo-l/11/58/e0/2a/photo0jpg.jpg'},
  {name:'Madarela', rating:'3.5',description:'loremloremloremloremloremloremlorem',photo:'https://media-cdn.tripadvisor.com/media/photo-l/11/58/e0/2a/photo0jpg.jpg'},
  {name:'Madarela', rating:'3.5',description:'loremloremloremloremloremloremlorem',photo:'https://media-cdn.tripadvisor.com/media/photo-l/11/58/e0/2a/photo0jpg.jpg'},
  {name:'Madarela', rating:'3.5',description:'loremloremloremloremloremloremlorem',photo:'https://media-cdn.tripadvisor.com/media/photo-l/11/58/e0/2a/photo0jpg.jpg'},

]

export const MainPage = (props) => {
    const dispatch=useDispatch()
    const [showPlace,setShowPlace]=useState(false)
    const [radius,setRadius]=useState(null)
    const [center, setCenter] = useState(defaultValueCenter)
    const [places,setPlaces]=useState([])
  
  
    // useEffect(()=>{
    //   console.log(center)
    //   console.log(showPlace)
    //   getPlacesData(center,radius)
    //   .then((data)=>{
    //     console.log(data)
    //     if(showPlace==true){setPlaces(data)}
    //   })
    // },[showPlace])
  
  
  
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
    const [modalActive,setModalActive]=useState(false)
  
    const {isAuth}=useAuth();
    
    return isAuth ? (
        <div className={s.container}>
          <div className={s.sideBar}>
            <p className={s.logo}>4EX MAP</p>
            <div className={s.radiusInput}>
            <p className={s.inputTop}>По какому радиусу будет поиск?</p>
            <input placeholder='Введите радиус...' value={radius} onChange={(e)=>setRadius(e.target.value)} type='number' className={s.sideBarInput}/>
            <button className={s.btnshow} onClick={()=>setShowPlace(true)}>Показать</button>
            </div>
            <div className={s.btngroup}>
              <ul>
                <li>Избранное</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div className={s.placeDetailsList}>
              { places?.map((place,i)=>(
                <PlaceDetail place={place}/>
              ))}
            </div>
            <div className={s.btnloginout}>
              <button onClick={()=>dispatch(removeUser())}>Выйти</button>
            </div>
          </div>
          <div className={s.mapContainer}>
            <div className={s.addresSearchContainer}>
              <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect}/>
            </div>
            {isLoaded ?  <Map className={s.map} center={center} places={places} showPlace={showPlace} radius={radius}/> : <h2>Loading...</h2>}
            <button
            className={s.btn}
            onClick={() => getBrowserLocation().then(currentLocation => { setCenter(currentLocation)})}
            />
          </div>
        </div>
      ) : (
         redirect('/login')
      );
  }
