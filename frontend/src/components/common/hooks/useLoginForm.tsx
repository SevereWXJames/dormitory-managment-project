// hooks/useLogin.ts
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useLoginMutation} from "@/context/api/apiServices/authApi.ts";

export function useLoginForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);

    const [login, { isLoading }] = useLoginMutation();
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
        if ((!username || username.trim() === "") && (!email || email.trim() === "")) {
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
                email: email || undefined,
                password,
            }).unwrap();

            const targetPath = (data.roles ?? []).some((role) =>
                role === "Admin" || role === "Staff") ?
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
        email, setEmail,
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