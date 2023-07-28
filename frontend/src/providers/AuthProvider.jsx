import { useEffect, useState } from 'react'
import { AuthContext } from '../contexts/createContext';

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState()
    //TODO
    useEffect(() => console.log(auth), [auth])
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;