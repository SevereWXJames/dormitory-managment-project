// hooks/useLogin.ts
import {useNavigate} from "react-router-dom";
import {type SignUpRequest, useSignUpMutation} from "@/context/api/apiServices/authApi.ts";
import {useState} from "react";
import {Role} from "@/dataTypes/user.ts";
import {type FormErrors, type UserInputForm, validateForm} from "@/components/common/Auth/utils/signup.utils.tsx";

export function useSignUpForm(role: Role) {
    const [form, setForm] = useState<UserInputForm>({
        name: "",
        username: "",
        password: "",
        phoneNumber: "",
        email: "",
        role: role? Role.RESIDENT : role,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [signUp, {isLoading, isError, error}] = useSignUpMutation();
    const navigate = useNavigate();

    const handleChange = (field: keyof UserInputForm) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm((prev) => ({...prev, [field]: e.target.value}));
        };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newErrors = validateForm(form);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            const request: SignUpRequest = {...form};
            await signUp(request).unwrap();

            const targetPath = (form.role === Role.ADMIN ? "/admin/dashboard" : "/dashboard");
            navigate(targetPath);
        }
    };

    return {
        form, setForm,
        errors, setErrors,
        handleChange, handleSubmit,
        isLoading, isError, error
    };
}