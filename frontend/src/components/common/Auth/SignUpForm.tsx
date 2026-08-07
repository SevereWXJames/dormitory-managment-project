import {Button, FormControl, InputLabel, OutlinedInput} from "@mui/material";
import {useSignUpForm} from "@/components/common/Auth/hooks/useSignUpForm.tsx";
import type {UserInputForm} from "@/components/common/Auth/utils/signup.utils.tsx";
import {PasswordField} from "@/components/common/Auth/PasswordField.tsx";
import type {Role} from "@/dataTypes/user.ts";

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
type SignUpFormProps = {
    role: Role,
    onSuccessCallback?: () => void;
    onFailureCallback?: (err: Error) => void;
}

export function SignUpForm(props : SignUpFormProps) {
    const signUpFields: { key: keyof UserInputForm; label: string; type?: string, inputProps?: any}[] = [
        {key: "name", label: "Name", type: "text"},
        {key: "email", label: "Email", type: "text"},
        {key: "phoneNumber", label: "Phone Number", type: "text", inputProps: {maxLength: 10}},
    ];

    const {form, errors, isLoading, isError, handleChange, handleSubmit, handleCancel, submitError} = useSignUpForm({role: props.role});
    return (<div className="login-form flex flex-col gap-4 m-2 items-center mx-auto"
                 style={{width: 'fit-content', margin: '0 auto'}}>
        {signUpFields.map(({key, label, type, inputProps}) => (
            <FormControl key={key} sx={{m: 1, width: '100%', maxWidth: '30ch'}} error={!!errors[key]}>
                <InputLabel htmlFor={`${key}-input`}>{label}</InputLabel>
                <OutlinedInput
                    id={`${key}-input`}
                    type={type ?? "text"}
                    label={label}
                    value={form[key]}
                    onChange={handleChange(key)}
                    inputProps={inputProps ?? {}}
                />
                {errors[key] && <span className="red text-red-500">{`Error: ${errors[key]}`}</span>}
            </FormControl>
        ))}
        <PasswordField onChange={handleChange("password")} isError={errors["password"]}/>
        {isLoading && <p>Loading ... </p>}
        {(submitError || isError) && <p className="red text-red-500" style={{width: '100%'}}>{submitError ?? "Error signing up"}</p>}
        <div style={{display: "flex", gap: "1rem"}}>
            <FormControl>
                <Button id="cancel-button" variant="outlined" onClick={handleCancel}>Cancel</Button>
            </FormControl>
            <FormControl>
                <Button id="open-nav-bar-button" variant="contained" onClick={handleSubmit}>Sign Up</Button>
            </FormControl>
        </div>
    </div>);
}