import React from 'react';

import s from './Modal.module.css';

export const Modal = ({active,setActive}) => {
  return(
    <div className={s.modal} onClick={()=>setActive(false)}>
      <div className={s.modalContent} onClick={e=>e.stopPropagation()}>
        <img src="" alt="Loading..." className={s.modalImg}/>
        <div className={s.modalDescription}>
          <h2 className={s.modalName}>Название</h2>
          <p>Рейтинг</p>
        </div>
        <button onClick={()=>setActive(true)}>true</button>
        <button onClick={()=>setActive(false)}>false</button>
        <button onClick={()=>console.log(active)}>Check</button>
      </div>
    </div>
  );
};
