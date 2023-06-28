/*global google*/
import React from 'react'

import { Routes, Route } from 'react-router-dom'

import { LoginPage } from './pages/LoginPage/LoginPage'
import { MainPage } from './pages/MainPage/MainPage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegisterPage />} />
        </Routes>
    )
}

export default App
