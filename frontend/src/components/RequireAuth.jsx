import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useAuthContext, useTabContext } from "../hooks/useCustomContext";


const RequireAuth = () => {
    const { auth } = useAuthContext()
    const tabs = useTabContext()
    const location = useLocation()

    return (
        auth
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth