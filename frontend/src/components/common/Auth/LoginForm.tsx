import {Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
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

    const {
        email, setEmail,
        password, setPassword,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleMouseUpPassword,
        loginError,
        emailError,
        passwordError,
        handleLogIn,
    } = useLoginForm();

    return (
        <div className="login-form flex flex-col gap-4 m-2 items-center mx-auto"
             style={{width: 'fit-content', margin: '0 auto'}}>
            <FormControl error={Boolean(emailError)} sx={{m: 1, width: '100%', maxWidth: '30ch'}}>
                <InputLabel htmlFor={`${emailFieldID}-input`}>E-mail</InputLabel>
                <OutlinedInput
                    id={`${emailFieldID}-input`}
                    type='text'
                    label="E-mail"
                    value={email}
                    onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                />
                {emailError && <FormHelperText>{emailError}</FormHelperText>}
            </FormControl>
            <FormControl error={Boolean(passwordError)} sx={{m: 1, width: '100%', maxWidth: '30ch'}}>
                <InputLabel htmlFor={`${passwordFieldID}-input`}>Password</InputLabel>
                <OutlinedInput
                    id={`${passwordFieldID}-input`}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
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
                                {showPassword ? <span className="password-field-edge-button">Hide</span> :
                                    <span className="password-field-edge-button">Show</span>}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Password"
                />
                {passwordError && <FormHelperText>{passwordError}</FormHelperText>}
            </FormControl>
            <FormControl>
                <Button id="open-nav-bar-button" variant="contained" onClick={handleLogIn}>Log in</Button>
            </FormControl>
            {loginError && <p style={{color: "red"}}>{loginError}</p>}
        </div>
    )
}