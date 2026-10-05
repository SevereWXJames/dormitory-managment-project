import type {Role} from "@/dataTypes/user.ts";
import {useSelector} from "react-redux";
import {getUserId, getUserRole} from "@/context/authenticationSlice.ts";
import {Navigate} from "react-router-dom";

interface ProtectedRouteProps {
    allowedRoles: Role[];
    children: React.ReactNode;
}

export function ProtectedRoute({allowedRoles, children} : ProtectedRouteProps){
    const userId = useSelector(getUserId);
    const userRoles = useSelector(getUserRole);
    console.log(`userId: ${userId}`);
    console.log(`userRoles: ${userRoles}`);
    console.log(`allowedRoles: ${allowedRoles}`);

    const hasPermission = userRoles.some(role => allowedRoles.includes(role));
    if (!userId){
        return <Navigate to="/login" replace />;
    }
    if(!hasPermission){
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
}