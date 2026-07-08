import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {usePasswordField} from "@/components/common/Auth/hooks/usePasswordField.tsx";

type PasswordFieldProps = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isError: string | undefined;
}

export function PasswordField({onChange, isError}: PasswordFieldProps) {
    const passwordFieldID = "password-field";
    const {
        setPassword,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        handleMouseUpPassword,
    } = usePasswordField();

    return (
        <FormControl sx={{m: 1, width: '100%', maxWidth: '30ch'}} error={!!isError}>
            <InputLabel htmlFor={`${passwordFieldID}-input`}>Password</InputLabel>
            <OutlinedInput
                id={`${passwordFieldID}-input`}
                type={showPassword ? 'text' : 'password'}
                onChange={onChange}
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
            {isError && <span className="red text-red-500">{`Error: ${isError}`}</span>}
        </FormControl>
    );

}