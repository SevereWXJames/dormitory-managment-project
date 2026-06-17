import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../context/authenticationSlice";

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
	
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	/**
	 * TODO. For M2, redirects to the building manager view if the
	 * provided e-mail has the word “admin” in it, and to the resident view
	 * otherwise.
	 * 
	 * Intended to handle the log in process, sending login information 
	 * over for authentication.
	 */
	const handleLogIn = () => {
		logIn({email, password});
		navigate("/dashboard");
	}

	return (
		<div id="login-form" style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', width: '25ch' }}>
			<FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
				<InputLabel htmlFor={`${emailFieldID}-input`}>E-mail</InputLabel>
				<OutlinedInput
					id={`${emailFieldID}-input`}
					type='text'
					label="E-mail"
					onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
				/>
			</FormControl>
			<FormControl sx={{ m: 1, width: '25ch' }} variant="filled">
				<InputLabel htmlFor={`${passwordFieldID}-input`}>Password</InputLabel>
				<OutlinedInput
					id={`${passwordFieldID}-input`}
					type={showPassword ? 'text' : 'password'}
					endAdornment={
					<InputAdornment position="end">
						<IconButton
						aria-label={
							showPassword ? 'hide the password' : 'display the password'
						}
						onClick={handleClickShowPassword}
						onMouseDown={handleMouseDownPassword}
						onMouseUp={handleMouseUpPassword}
						onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
						edge="end"
						>
						{showPassword ? <span>Hide</span>: <span>Show</span>}
						</IconButton>
					</InputAdornment>
					}
					label="Password"
				/>
			</FormControl>
			<FormControl>
				<Button id="open-nav-bar-button" variant="contained" onClick={handleLogIn}>Log in</Button>
			</FormControl>
		</div>
	)
}