import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useCustomContext";

const RequireAuth = () => {
    const { auth } = useAuthContext()
    const location = useLocation()

    return (
        auth
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth