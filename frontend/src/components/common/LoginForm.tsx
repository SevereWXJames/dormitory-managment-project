import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../context/authenticationSlice";
import { useDispatch } from "react-redux";
import { fetchJson } from "../../utils/api.ts";

/**
 * React component for the login form, including e-mail and password fields,
 * and a “Log in” button.
 * 
 * The password field and its associated variables and functions were adapted
 * from the Material UI documentation.
 * (https://mui.com/material-ui/react-text-field/#input-adornments)
 * 
 * @returns JSX for the login form
 */
export function LoginForm() {
    const emailFieldID = "email-field";
	const passwordFieldID = "password-field";
    const usernameFieldID="username-field";
	
	const navigate = useNavigate();
    const [username, setUsername] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState<string | null>(null);
    const dispatch = useDispatch();

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	/**
	 * Sends login information to the backend and routes based on the
	 * authenticated user role from the server.
	 */
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
            const data = await fetchJson<{ _id: string, username: string, email: string, roles: string[] }>(
                "/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: username || undefined, email: email || undefined, password }),
                }
            );

            dispatch(logIn({ username: data.username, email: data.email, userId: data._id, roles: data.roles }));
            const targetPath = (data.roles ?? []).some((role) => role === "Admin" || role === "Staff") ? "/admin/dashboard" : "/dashboard";
            navigate(targetPath);
        } catch (error) {
            setLoginError(error instanceof Error ? error.message : "Login failed.");
        }
	}

	return (
		<div className="login-form flex flex-col gap-4 m-4 items-center mx-auto" style={{ width: 'fit-content', margin: '0 auto' }}>
            <FormControl sx={{ m: 1, width: '30ch' }} variant="filled">
                <InputLabel htmlFor={`${usernameFieldID}-input`}>Username</InputLabel>
                <OutlinedInput
                    id={`${usernameFieldID}-input`}
                    type='text'
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
                />
            </FormControl>
			<FormControl sx={{ m: 1, width: '30ch' }} variant="filled">
				<InputLabel htmlFor={`${emailFieldID}-input`}>E-mail</InputLabel>
				<OutlinedInput
					id={`${emailFieldID}-input`}
					type='email'
					label="E-mail"
					value={email}
					onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
				/>
			</FormControl>
			<FormControl sx={{ m: 1, width: '30ch' }} variant="filled">
				<InputLabel htmlFor={`${passwordFieldID}-input`}>Password</InputLabel>
				<OutlinedInput
					id={`${passwordFieldID}-input`}
					type={showPassword ? 'text' : 'password'}
					onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
					endAdornment={
					<InputAdornment position="end">
						<IconButton
						aria-label={
							showPassword ? 'hide the password' : 'display the password'
						}
						onClick={handleClickShowPassword}
						onMouseDown={handleMouseDownPassword}
						onMouseUp={handleMouseUpPassword}
						edge="end"
						>
						{showPassword ? <span className="password-field-edge-button">Hide</span>: <span className="password-field-edge-button">Show</span>}
						</IconButton>
					</InputAdornment>
					}
					label="Password"
				/>
			</FormControl>
			<FormControl>
				<Button id="open-nav-bar-button" variant="contained" onClick={handleLogIn}>Log in</Button>
			</FormControl>
                {loginError && <p style={{ color: "red" }}>{loginError}</p>}
		</div>
	)
}