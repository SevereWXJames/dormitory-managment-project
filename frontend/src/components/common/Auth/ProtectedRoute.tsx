import type {Role} from "@/dataTypes/user.ts";
import {useSelector} from "react-redux";
import {getUserId, getUserRole} from "@/context/authenticationSlice.ts";
import {useNavigate} from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles: Role[];
    children: React.ReactNode;
}

export function ProtectedRoute({allowedRoles, children} : ProtectedRouteProps){
    const userId = useSelector(getUserId);
    const userRoles = useSelector(getUserRole);
    const navigate = useNavigate();
    if (!userId) {
        return navigate('/login');
    }

    const hasPermission = userRoles.find((role) => {allowedRoles.includes(role)});
    if(!hasPermission){
        return navigate('/unauthorized');
    }

    return <>{children}</>;
}