import {useState} from "react";

export function usePasswordField() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return ({
        password, setPassword,
        showPassword, setShowPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleMouseUpPassword,
    })
}