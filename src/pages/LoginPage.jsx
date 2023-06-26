import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { setUser } from '../store/slices/userSlice'

import s from './LoginPage.module.css'

export const LoginPage = (props) => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const handleLogin = (email, password) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
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
            .catch(() => alert('Неправильный e-mail или пароль!'))
    }

    return (
        <div>
            <div className={s.wrapper}>
                <h1>Sign In</h1>
                <div className={s.signin} autocomplete="off">
                    <input
                        type="email"
                        className={s.user}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Username"
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
                </div>
            </div>
        </div>
    )
}
