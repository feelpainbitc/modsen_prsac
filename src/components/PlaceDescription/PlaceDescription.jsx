import React, { useState,useContext,useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import { collection, addDoc } from 'firebase/firestore'; 
import { doc, setDoc, updateDoc,serverTimestamp, query, where, getDocs } from 'firebase/firestore';

// import {firebase} from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

import { fetchDirection } from '../../utils/fetchdir'
import { useAuth } from '../../hooks/use-auth.js';
import { Review } from '../Review/Review.jsx';
import zagluwka from '../../assets/zagluwka.png'
import guest from '../../assets/guesticon.png'
import {Context} from '../../index.js'

import s from './PlaceDescription.module.css'



export const PlaceDescription = ({isOpen, onClose,place,center,setDirections,directionsRendererRef}) => {
  const [value,setValue]=useState('')
  const {auth,db,app}=useContext(Context)
  const [user]=useAuthState(auth)
  const [reviews, setReviews]=useState(null)

  const takeMessage= async()=>{
    const q = query(collection(db, place.location_id));
    const querySnapshot = await getDocs(q);
    const reviewsData = [];
    querySnapshot.forEach((doc) => {
      reviewsData.push(doc.data());
    });
    setReviews(reviewsData);
  }

  useEffect(() => {
    if (isOpen) {
      takeMessage();
    }
  }, [isOpen]);




  const sendMessage= async ()=>{
    await addDoc(collection(db, place.location_id), {
              mail:user.email,
              text: value,
              timestamp: serverTimestamp(),
    });
    setValue('')
    takeMessage(); 
  };

  const addFavourites= async ()=>{
    await addDoc(collection(db, user.email), {
            photo:  place.photo.images.medium.url,
            description: place.description,
            name: place.name,
    });
  };


  if (!isOpen) return null;


  
  return ReactDOM.createPortal(
  <div className={s.modal}>
    <div className={s.header}>
      <h3>{place.name}</h3>
      <button onClick={onClose}>Х</button>
    </div>
    <div className={s.main}>
      <img  src={
                        place.photo
                            ? place.photo.images.medium.url
                            : { zagluwka }
                    }
                    alt="No photo"/>
      <p>{place.description ? place.description : 'Пока нет описания данного места...'}</p>
    </div>
    <div className={s.reviews}>
      <div className={s.reviewsBox}>
      {reviews && reviews.length > 0 ? (
       reviews.map((review, index) => (
       <Review key={index} review={review} />
         ))
       ) : (
        <p>Пока нет отзывов, будьте первым!</p>
      )}
      </div>
      <div className={s.inputs}>
      <textarea
            value={value}
            onChange={e=>setValue(e.target.value)}
          ></textarea>
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
    <div className={s.btngroup}>
      <button onClick={addFavourites}>В избранное</button>
    <button onClick={()=>{
          fetchDirection(place, center, setDirections,directionsRendererRef)
        }}>
          Маршрут</button>
    </div>
  </div>,
    document.getElementById('modal-root')
  );
};