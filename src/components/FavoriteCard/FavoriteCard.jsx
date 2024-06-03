import React,{useContext} from 'react'
import { doc, setDoc, updateDoc,serverTimestamp, query, where, getDocs,deleteDoc,collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'; 

import zaglywka from '../../assets/zagluwka.png'
import { Context } from '../../index.js'

import s from './FavoriteCard.module.css'

export const FavoriteCard = ({key,favourite,takeFavourites}) => {
    const {auth,db,app}=useContext(Context)
    const [user]=useAuthState(auth)

    async function deleteDocument(docId) {
        try {
            const docRef = doc(db, user.email, favourite.id);
            await deleteDoc(docRef);

        } catch (error) {
          console.error('Error deleting document: ', error);
        }
        takeFavourites();
      }

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
            {favourite.photo!==null && favourite.photo!==undefined && favourite.photo!=='' ? (
                <img src={favourite.photo} alt="Favourite" />
                ) : (
                <img src={zaglywka} alt="Placeholder" />
                )}
                <h2>{favourite.name}</h2>
            </div>
            <div className={s.description}>
            {favourite.description !== null && favourite.description !== undefined && favourite.description!=='' ? (
                 favourite.description
                  ) : (
                 'Пока нет описания...'
             )}
            </div>
            <div className={s.buttongroup}>
            <button>Маршрут</button>
            <button onClick={deleteDocument}>Удалить из избранного</button>
            </div>
        </div>
    )
}
