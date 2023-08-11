import { ReactComponent as LogoIcon } from '../assets/logos/logo+en.svg'
import { ReactComponent as AppIcon } from '../assets/logos/App.svg'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, login } from '../api/auth';
import { useAlertContext, useAuthContext } from '../hooks/useCustomContext';

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export default function Login() {

    const { alertWarning, alertError, alertSuccess, alertConfirm } = useAlertContext()
    const { setAuth } = useAuthContext();
    const navigate = useNavigate()

    useEffect(() => {
        if (document.cookie !== "") {
            const cookies = document.cookie.split('; ');
            setAuth({
                username: cookies?.[1]?.split('=')?.[1],
                userType: cookies?.[2]?.split('=')?.[1]
            })
            navigate("/user")
        }
    }, [])

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleUsernameChange = (e) => { setUsername(e.target.value); };
    const handlePasswordChange = (e) => { setPassword(e.target.value); };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await login({ username, password })
        switch (res?.code) {
            case 200:
                setAuth(res.data)
                navigate('/user')
                setCookie("username", res.data.username, 7)
                setCookie("userType", res.data.userType, 7)
                break;
            case 400:
                alertWarning(res.message)
                break;
            default:
                alertError("未知错误，请联系飞书管理员!")
                break;
        }
    };

    const handleForgetPassword = () => {
        alertWarning("请联系飞书管理员!")
    }

    const handleCreateUser = async () => {
        await createUser({ username, password, userType: 1 })
    }

    return (
        <div id="login-page" className="container">
            <div className="logo-wrapper">
                <LogoIcon className="logo" />
            </div>
            <div className="login-form-wrapper">
                <AppIcon className="app-icon" />
                <form className="login-form" onSubmit={handleSubmit}>
                    <div >
                        <input
                            type="username"
                            id="username"
                            value={username}
                            className='input-container'
                            placeholder='用户名'
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div >
                        <input
                            type="password"
                            id="password"
                            className='input-container'
                            value={password}
                            placeholder='密码'
                            onChange={handlePasswordChange}
                        />
                        <h1 onClick={handleForgetPassword} className="row forget-password">忘记密码？</h1>
                    </div>
                    <button className="login-btn" type="submit">登录</button>
                </form>
            </div>

        </div>
    )
}
