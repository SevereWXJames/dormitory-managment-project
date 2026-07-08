import type {Role} from "@/dataTypes/user.ts";
import {useSelector} from "react-redux";
import {getAuthenticationState, getUserId} from "@/context/authenticationSlice.ts";
import {useNavigate} from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles: Role[];
    children: React.ReactNode;
}

export function ProtectedRoute({allowedRoles, children} : ProtectedRouteProps){
    const userId = useSelector(getUserId);
    const userRole = useSelector(getAuthenticationState);
    const navigate = useNavigate();
    if (!userId) {
        navigate('/login');
    }

    if (!allowedRoles.includes(user.role)) {
        return navigate('/unauthorized');
    }

    return <>{children}</>;

}