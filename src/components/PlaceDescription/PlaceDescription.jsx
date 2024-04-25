import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import {useCollectionData} from 'react-firebase-hooks/firestore'
// import {firebase} from 'firebase'

import { fetchDirection } from '../../utils/fetchdir'
import { useAuth } from '../../hooks/use-auth.js';
import zagluwka from '../../assets/zagluwka.png'
import db from '../../firebase.js'

import s from './PlaceDescription.module.css'


export const PlaceDescription = ({isOpen, onClose,place,center,setDirections,directionsRendererRef}) => {
  const state = useSelector(state => state);
  const user=state.user;
  console.log(db)
  const [value,setValue]=useState('')
  const { isAuth } = useAuth()
  const [reviews, loading] = useCollectionData(
    db.collection('reviews').orderBy('createdAt')
  )

  if (!isOpen) return null;

  const sendReview= async()=>{
    db.collection('reviews').add({
      locid: place.location_id,
      uid: user.uid,
      mail: user.email,
      text: value,
      // createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setValue('')
  }

  return ReactDOM.createPortal(
    <div className={s.modal}>
      <div className={s.modalwrapper}>
      <div className={s.modalheader}>
        <h3>{place.name}</h3>
        <button onClick={onClose}>Х</button>
      </div>
      <div className={s.modalmain}>
      <img
                    src={
                        place.photo
                            ? place.photo.images.medium.url
                            : { zagluwka }
                    }
                    alt="No photo"
                />
        <h4>{place.description}</h4>
      </div>
      <div className={s.modalreviews}>
        <p>Отзывы</p>
        <div className={s.modalreviewsBox}></div>
        <div className={s.modalreviewsInputs}>
          <textarea
            value={value}
            onChange={e=>setValue(e.target.value)}
          ></textarea>
          <button onClick={sendReview}>=|=</button>
        </div>
      </div>
      <div className={s.modalbtngroup}>
        <button>В избранное</button>
        <button onClick={()=>{
          fetchDirection(place, center, setDirections,directionsRendererRef)
        }}>
          Маршрут</button>
      </div>
    </div>
  </div>,
    document.getElementById('modal-root')
  );
};