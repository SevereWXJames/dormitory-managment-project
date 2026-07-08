import type {Role} from "@/dataTypes/user.ts";
import {useSelector} from "react-redux";
import {getUserId, getUserRole} from "@/context/authenticationSlice.ts";
import {LoginPage} from "@/pages/common/LoginPage.tsx";
import {UnauthorizedPage} from "@/pages/UnauthorizedPage.tsx";

interface ProtectedRouteProps {
    allowedRoles: Role[];
    children: React.ReactNode;
}

export function ProtectedRoute({allowedRoles, children} : ProtectedRouteProps){
    const userId = useSelector(getUserId);
    const userRoles = useSelector(getUserRole);
    if (!userId) {
        return <LoginPage/>;
    }

    const hasPermission = userRoles.find((role) => {allowedRoles.includes(role)});
    if(!hasPermission){
        return <UnauthorizedPage/>
    }

    return <>{children}</>;
}