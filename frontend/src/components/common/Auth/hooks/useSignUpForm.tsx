// hooks/useLogin.ts
import {useNavigate} from "react-router-dom";
import {type SignUpRequest, useSignUpMutation} from "@/context/api/apiServices/authApi.ts";
import {useState} from "react";
import {Role} from "@/dataTypes/user.ts";
import {type FormErrors, type UserInputForm, validateForm} from "@/components/common/Auth/utils/signup.utils.tsx";

export function useSignUpForm(role: Role) {
    const [form, setForm] = useState<UserInputForm>({
        name: "",
        password: "",
        phoneNumber: "",
        email: "",
        role: role? role : Role.RESIDENT,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [signUp, {isLoading, isError, error}] = useSignUpMutation();
    const navigate = useNavigate();

    const handleChange = (field: keyof UserInputForm) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({...prev, [field]: e.target.value}));
            setSubmitError(null);
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newErrors = validateForm(form);
        setErrors(newErrors);
        setSubmitError(null);
        if (Object.keys(newErrors).length === 0) {
            const request: SignUpRequest = {...form, roles:[form.role]};
            try {
                const data = await signUp(request).unwrap();
                console.log(`Data: ${JSON.stringify(data)}`);

                const targetPath = (form.role === Role.ADMIN ? "/admin/dashboard" : "/dashboard");
                navigate(targetPath);
            } catch (err) {
                // const message = err && typeof err === "object" && "data" in err && err.data && typeof err.data === "object" && "message" in err.data && typeof err.data.message === "string"
                //     ? err.data.message
                //     : err instanceof Error
                //         ? err.message
                //         : "Unable to sign up. Please try again.";

                let errorMessage = "Unable to sign up. Please try again.";

                if ((err as Error).message != null) {
                    errorMessage = (err as Error).message;
                }

                setSubmitError(errorMessage);
            }
        }
    };

    const handleCancel = async () => {
        history.back();
    }

    return {
        form, setForm,
        errors, setErrors,
        handleChange, handleSubmit,
        handleCancel,
        isLoading, isError, error,
        submitError,
    };
}