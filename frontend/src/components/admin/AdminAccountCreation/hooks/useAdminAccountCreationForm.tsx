import {type SignUpRequest, useCreateAdminMutation} from "@/context/api/apiServices/authApi.ts";
import {useState} from "react";
import {Role} from "@/dataTypes/user.ts";
import {type FormErrors, type UserInputForm, validateForm} from "@/components/common/Auth/utils/signup.utils.tsx";

type useAdminAccountCreationFormProps = {
    onSuccessCallback?: () => void;
    onFailureCallback?: (err: Error | unknown) => void;
}

export function useAdminAccountCreationForm(props: useAdminAccountCreationFormProps) {
    const [form, setForm] = useState<UserInputForm>({
        name: "",
        password: "",
        phoneNumber: "",
        email: "",
        role: Role.ADMIN,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [createAdmin, {isLoading, isError, error}] = useCreateAdminMutation();

    const handleChange = (field: keyof UserInputForm) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({...prev, [field]: e.target.value}));
            setSubmitError(null);
            setErrors((prev) => ({...prev, [field]: undefined}));
        };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newErrors = validateForm(form);
        setErrors(newErrors);
        setSubmitError(null);
        if (Object.keys(newErrors).length === 0) {
            const request: SignUpRequest = {...form, roles: [form.role]};
            try {
                await createAdmin(request).unwrap();
                props.onSuccessCallback?.();
            } catch (err) {
                const errorMessage = "Unable to create an account.";
                setSubmitError(errorMessage);
                props.onFailureCallback?.(err);
            }
        }
    };

    return {
        form, setForm,
        errors, setErrors,
        handleChange, handleSubmit,
        isLoading, isError, error,
        submitError,
    };
}