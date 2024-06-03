import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { initializeApp } from 'firebase/app'
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'

import App from './App'

// import { initializeApp } from 'firebase/app'
// import 'firebase/firestore';
// import { getFirestore } from 'firebase/firestore';

// import { store } from './store'
import './index.css'








const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,

    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,

    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,

    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,

    appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);


const auth = getAuth(app);

export const Context = createContext(null)



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Context.Provider value={{
                app,
                auth,
                db,
            }}>
                <App />
            </Context.Provider>
        </BrowserRouter>
    </React.StrictMode>
)
