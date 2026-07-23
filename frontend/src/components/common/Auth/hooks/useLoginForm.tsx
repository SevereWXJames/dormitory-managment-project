// hooks/useLogin.ts
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLoginMutation} from "@/context/api/apiServices/authApi.ts";
import {Role} from "@/dataTypes/user.ts";

export function useLoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    const [login, {isLoading}] = useLoginMutation();
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleLogIn = async () => {
        setLoginError(null);
        if ((!username || username.trim() === "")) {
            setLoginError("Username or email is required.");
            return;
        }
        if (!password) {
            setLoginError("Password is required.");
            return;
        }

        try {
            const data = await login({
                username: username || undefined,
                email: undefined,
                password,
            }).unwrap();

            console.log(`data roles: ${data.roles}`);
            const targetPath = (data.roles ?? []).some((role) =>
                role === Role.ADMIN || role == "Staff") ?
                "/admin/dashboard" : "/dashboard";
            navigate(targetPath);
        } catch (error) {
            setLoginError(
                error && typeof error === "object" && "message" in error
                    ? String((error as { message: unknown }).message)
                    : "Login failed."
            );
        }
    };

    return {
        username, setUsername,
        password, setPassword,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleMouseUpPassword,
        loginError,
        isLoading,
        handleLogIn,
    };
}