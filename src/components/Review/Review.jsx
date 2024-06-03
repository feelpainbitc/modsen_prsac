import React, { useState,useContext } from 'react';

import guest from '../../assets/guesticon.png'

import './Review.css'

export const Review = ({key, review}) => {
  const date = new Date(review.timestamp.seconds * 1000); // Преобразование секунд в миллисекунды
  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;


  return(
    <div className="container">
        <img src={guest} alt=",,ad" />
        <div className="text">
          <div className="header">
            <p className="mail">{review.mail}</p>
            <p className="time">{formattedDate}</p>
          </div>
            <p className="review">{review.text}</p>
        </div>
    </div>
  );
};