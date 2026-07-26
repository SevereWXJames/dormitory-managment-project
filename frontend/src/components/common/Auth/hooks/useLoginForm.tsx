// hooks/useLogin.ts
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLoginMutation} from "@/context/api/apiServices/authApi.ts";
import {Role} from "@/dataTypes/user.ts";

export function useLoginForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string | null>(null);
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const [login, {isLoading}] = useLoginMutation();
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const clearFieldErrors = () => {
        setLoginError(null);
        setUsernameError(null);
        setEmailError(null);
        setPasswordError(null);
    };

    const getErrorMessage = (error: unknown): string => {
        if (typeof error === "string") {
            return error;
        }

        if (error && typeof error === "object") {
            const maybeError = error as {
                message?: unknown;
                error?: unknown;
                data?: unknown;
            };

            if (typeof maybeError.message === "string") {
                return maybeError.message;
            }

            if (typeof maybeError.error === "string") {
                return maybeError.error;
            }

            if (maybeError.data && typeof maybeError.data === "object") {
                const data = maybeError.data as { message?: unknown; error?: unknown };
                if (typeof data.message === "string") {
                    return data.message;
                }
                if (typeof data.error === "string") {
                    return data.error;
                }
            }
        }

        return "Login failed.";
    };

    const setFieldErrorMessages = (message: string) => {
        const normalized = message.toLowerCase();
        if (normalized.includes("username") && normalized.includes("email") && normalized.includes("required")) {
            setLoginError(message);
            setUsernameError(message);
            setEmailError(message);
            return;
        }

        if (normalized.includes("username") && normalized.includes("required")) {
            setUsernameError(message);
            return;
        }

        if (normalized.includes("email") && normalized.includes("required")) {
            setEmailError(message);
            return;
        }

        if (normalized.includes("username") && normalized.includes("email") && normalized.includes("do not match")) {
            setUsernameError(message);
            setEmailError(message);
            return;
        }

        if (normalized.includes("invalid email")) {
            setEmailError(message);
            return;
        }

        if (normalized.includes("incorrect password")) {
            setPasswordError(message);
            return;
        }

        setLoginError(message);
    };

    const handleLogIn = async () => {
        clearFieldErrors();
        if (!username || username.trim() === "") {
            const message = "Username is required.";
            setLoginError(message);
            setUsernameError(message);
            return;
        }

        if (!email || email.trim() === "") {
            const message = "Email is required.";
            setLoginError(message);
            setEmailError(message);
            return;
        }

        const simpleEmailRegex = /^\S+@\S+\.\S+$/;
        if (!simpleEmailRegex.test(email.trim())) {
            const message = "Please enter a valid email address like name@example.com.";
            setLoginError(message);
            setEmailError(message);
            return;
        }
        if (!password) {
            const message = "Password is required.";
            setLoginError(message);
            setPasswordError(message);
            return;
        }

        try {
            const { data } = await login({
                username: username || undefined,
                email: email || undefined,
                password,
            }).unwrap();

            const targetPath = (data.roles ?? []).some((role) =>
                role === Role.ADMIN || role == "Staff") ?
                "/admin/dashboard" : "/dashboard";
            navigate(targetPath);
        } catch (error) {
            const message = getErrorMessage(error);
            setFieldErrorMessages(message);
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
        usernameError,
        emailError,
        passwordError,
        isLoading,
        handleLogIn,
    };
}