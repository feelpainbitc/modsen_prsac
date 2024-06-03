import React,{useContext,useState,useEffect} from 'react'
import { doc, setDoc, updateDoc,serverTimestamp, query, where, getDocs,deleteDoc,collection, addDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth'; 

import { FavoriteCard } from '../FavoriteCard/FavoriteCard'
import { Context } from '../../index.js'


import './FavoriteBar.css'

export const FavoriteBar = ({ active, setActive }) => {
    const {auth,db,app}=useContext(Context)
    const [user]=useAuthState(auth)
    const [favourites, setFavourites]=useState(null)

    const takeFavourites= async()=>{
        const q = query(collection(db, user.email));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot)
        const favouriteData = [];
        querySnapshot.forEach((doc) => {
            favouriteData.push({
                id: doc.id, 
                ...doc.data(), 
            });
        });
        console.log(favouriteData)
        setFavourites(favouriteData);
      }



      useEffect(() => {
        if (active) {
          takeFavourites();
        }
      }, [active]);

    return (
        <div className={active ? 'wrapper active' : 'wrapper'}>
            <input placeholder="Поиск по избранному..." />
            <h2>Избранное:</h2>
            <div className="list">
            {favourites && favourites.length > 0 && (
    favourites.map((favourite, index) => (
        <FavoriteCard key={index} favourite={favourite} takeFavourites={takeFavourites} />
    ))
)}
            </div>
        </div>
    )
}
