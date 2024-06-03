/*global google*/
import React,{useContext} from 'react'

import { Routes, Route } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'

import { LoginPage } from './pages/LoginPage/LoginPage'
import { MainPage } from './pages/MainPage/MainPage'
import {Loader} from './components/Loader/Loader.js'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'

import { Context } from './index.js'

function App() {
    const {auth} = useContext(Context)
    const [user,loading,error] = useAuthState(auth)

    if(loading){
        return <Loader/>
    }

    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegisterPage />} />
        </Routes>
    )
}

export default App
