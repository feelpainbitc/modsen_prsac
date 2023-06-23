/*global google*/
import React, { useCallback,useEffect } from 'react';




import {Routes,Route} from "react-router-dom"



import { LoginPage } from './pages/LoginPage';
import { MainPage } from './pages/MainPage';
import { RegisterPage } from './pages/RegisterPage';










function App() {
  return(
    <Routes>
      <Route  path='/' element={<MainPage/>}/>
      <Route  path='/login' element={<LoginPage/>}/>
      <Route  path='/registration' element={<RegisterPage/>}/>
    </Routes>
  );
}

export default App;
