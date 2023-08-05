import { useAuthContext, useTabContext } from "../hooks/useCustomContext";
import { Navigate, useLocation } from "react-router-dom";

import children from '../path/children';

const RequireAuth = () => {
    const location = useLocation()
    const { auth } = useAuthContext()

    const routes = children.map((child, i) =>
        <div
            style={{ display: !location.pathname.includes(child.path) ? "none" : "flex" }}
            className="full-screen"
            key={i}>
            {child.element}
        </div>
    )

    return (
        auth
            ? routes
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;
