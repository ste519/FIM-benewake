import { useState, useEffect } from 'react'
import axios from 'axios';
import { AuthContext } from '../js/createContext';

const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState()
    useEffect(() => {
        axios.get('userinfo.json')
            .then((res) => setUserInfo(res.data))
            .catch((err) => console.log(err))
    },
        [])
    return (
        <AuthContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;