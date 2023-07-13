import React from 'react'
import LoginForm from '../components/loginForm'
import { ReactComponent as LogoIcon } from '../assets/logos/logo+en.svg'
import { ReactComponent as AppIcon } from '../assets/logos/App.svg'

export default function Login() {
    return (
        <div id="login-page" className="container">
            <div className="logo-wrapper">
                <LogoIcon className="logo" />
            </div>
            <div className="login-form-wrapper">
                <AppIcon className="app-icon"/>
                <LoginForm />
            </div>
        </div>
    )
}
