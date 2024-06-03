import React, { useContext, useState } from 'react'


import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import firebase from 'firebase/compat/app'
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth';

import { useNavigate } from 'react-router-dom'

import { setUser } from '../../store/slices/userSlice'
import { Context } from '../../index'

import s from './LoginPage.module.css'

export const LoginPage = (props) => {
    const {auth}=useContext(Context)
    
    const login = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const { user } = await signInWithPopup(auth, provider);
            console.log(user);
            // Если пользователь успешно аутентифицирован, перенаправляем его на главную страницу
            navigate('/');
        } catch (error) {
            console.error('Ошибка входа:', error);
        }
    };
    const navigate = useNavigate()

    // const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const handleLogin = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('Неправильный e-mail или пароль!');
              })
    }

    return (
            <div className={s.wrapper}>
                <h1>Sign In</h1>
                <div className={s.signin} autocomplete="off">
                    <input
                        type="email"
                        className={s.user}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                    />
                    <input
                        type="password"
                        className={s.pass}
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Password"
                    />
                    <button onClick={() => handleLogin(email, pass)}>
                        &#xf0da;
                    </button>
                    <p>
                        Нет аккаунта?{' '}
                        <a href="/registration">Зарегистрируйся!</a>
                    </p>
                    
                    <div>

                     

                </div>
                
            </div>
            <button className={s.googbtn} onClick={login}>Sign In With Google</button>  
        </div>
    
            
          );
}
