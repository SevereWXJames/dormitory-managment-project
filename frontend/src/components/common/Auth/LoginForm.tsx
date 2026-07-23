import {Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {useLoginForm} from "@/components/common/Auth/hooks/useLoginForm.tsx";

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
    const usernameFieldID = "username-field";

    const {
        username, setUsername,
        setPassword,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleMouseUpPassword,
        loginError,
        handleLogIn,
    } = useLoginForm();

    return (
        <div className="login-form flex flex-col gap-4 m-2 items-center mx-auto"
             style={{width: 'fit-content', margin: '0 auto'}}>
            <FormControl sx={{m: 1, width: '100%', maxWidth: '30ch'}}>
                <InputLabel htmlFor={`${usernameFieldID}-input`}>Username</InputLabel>
                <OutlinedInput
                    id={`${usernameFieldID}-input`}
                    type='text'
                    label="Username"
                    value={username}
                    onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
                />
            </FormControl>
            <FormControl sx={{m: 1, width: '100%', maxWidth: '30ch'}}>
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
                                onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                                edge="end"
                            >
                                {showPassword ? <span className="password-field-edge-button">Hide</span> :
                                    <span className="password-field-edge-button">Show</span>}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
            <FormControl>
                <Button id="open-nav-bar-button" variant="contained" onClick={handleLogIn}>Log in</Button>
            </FormControl>
            {loginError && <p style={{color: "red"}}>{loginError}</p>}
        </div>
    )
}