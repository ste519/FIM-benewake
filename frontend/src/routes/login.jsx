import { ReactComponent as LogoIcon } from '../assets/logos/logo+en.svg'
import { ReactComponent as AppIcon } from '../assets/logos/App.svg'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, login, logout } from '../api/auth';
import { useAlertContext, useAuthContext } from '../hooks/useCustomContext';

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = "benewake" + name + "=" + (value || "") + expires + "; path=/";
}

export default function Login() {

    const updateAlert = useAlertContext()
    const { setAuth } = useAuthContext();
    const navigate = useNavigate()

    useEffect(() => {
        if (document.cookie !== "") {
            const cookies = document.cookie.split('; ');

            const hasBenewakeusername = cookies.some(item => item.startsWith("benewakeusername="));
            const hasBenewakeuserType = cookies.some(item => item.startsWith("benewakeuserType="));
            if (hasBenewakeusername && hasBenewakeuserType) {
                setAuth({
                    username: cookies.find(item => item.startsWith("benewakeusername=")).split("=")[1],
                    userType: cookies.find(item => item.startsWith("benewakeuserType=")).split("=")[1]
                })
                navigate("/user")
            }
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
            case 202:
                await logout()
                await handleSubmit()
                break;
            case 400:
                updateAlert({ type: "SHOW_ALERT", data: { type: "warning", message: res.message } })
                break;
            default:
                updateAlert({ type: "SHOW_ALERT", data: { type: "error", message: "未知错误，请联系飞书管理员!" } })
                break;
        }
    };

    const handleForgetPassword = () => {
        updateAlert({ type: "SHOW_ALERT", data: { type: "warning", message: "请联系飞书管理员!" } })
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
