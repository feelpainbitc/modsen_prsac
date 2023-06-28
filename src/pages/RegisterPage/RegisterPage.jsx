import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

import { useDispatch } from 'react-redux'

import { setUser } from '../../store/slices/userSlice'

import s from '../LoginPage/LoginPage.module.css'

export const RegisterPage = (props) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const dispatch = useDispatch()

    const handleRegister = (email, password) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    setUser({
                        email: user.email,
                        id: user.uid,
                        token: user.accessToken,
                    })
                )
                navigate('/')
            })
            .catch(() => alert('Пользователь с таким e-mail уже существует'))
    }

    return (
        <div>
            <div className={s.wrapper}>
                <h1>Sign Up</h1>
                <div className={s.signin} autocomplete="off">
                    <input
                        type="email"
                        className={s.user}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail..."
                    />
                    <input
                        type="password"
                        className={s.pass}
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Password..."
                    />
                    <button onClick={() => handleRegister(email, pass)}>
                        &#xf0da;
                    </button>
                    <p>
                        Уже есть аккаунт?
                        <a href="/login">Войти!</a>
                    </p>
                </div>
            </div>
        </div>
    )
}
