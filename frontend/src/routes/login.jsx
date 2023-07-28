import { ReactComponent as LogoIcon } from '../assets/logos/logo+en.svg'
import { ReactComponent as AppIcon } from '../assets/logos/App.svg'

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser, login, logout } from '../api/auth';
import { useAuthContext, useAlertContext } from '../hooks/useCustomContext';


export default function Login() {


    const { showAlert } = useAlertContext();
    const { setAuth } = useAuthContext();
    const navigate = useNavigate()

    useEffect(() => {
        if (document.cookie !== "") {
            setAuth({ auth: true })
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
        console.log(res);
        switch (res?.code) {
            case 200:
                setAuth(res.data)
                navigate('/user')
                break;

            case 202:
                showAlert({ type: "warning", message: res.message })
                // setAuth({ username: username })
                // navigate('/user')
                break;

            case 400:
                showAlert({ type: "warning", message: res.message })
                break;

            default:
                showAlert({ type: "error", message: "未知错误，请联系飞书管理员!" })
                break;
        }
    };

    const handleForgetPassword = () => {
        showAlert({ type: "warning", message: "请联系飞书管理员!" })
    }

    const handleCreateUser = async () => {
        console.log(await createUser({ username, password, userType: 1 }))
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
                <div>
                    <h1>(测试用)</h1>
                    <button onClick={handleCreateUser}>新建用户</button>
                    
                </div>
            </div>

        </div>
    )
}
