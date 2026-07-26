import type {SignUpRequest} from "@/context/api/apiServices/authApi.ts";
import type {Role} from "@/dataTypes/user.ts";

export interface UserInputForm extends Omit<SignUpRequest,"roles"> {
    role: Role
};

type UserInputFormKey = keyof UserInputForm | string;

export type FormErrors = Partial<Record<UserInputFormKey, string>>;

const SignUpFormErrors: Record<UserInputFormKey, string> = {
    name: "Name is required",
    username: "Username is required",
    password: "Password is required",
    email: "Email is required",
};

const requiredInputs : UserInputFormKey[] = ["name", "username", "password", "email"];
const emailRegex = /^\S+@\S+\.\S+$/;

const validateInput = (key: UserInputFormKey, input: string | null) => {
    if (!input || input.trim().length <= 0 || input == "") return SignUpFormErrors[key];
    if (key === "email" && !emailRegex.test(input.trim())) {
        return "Please enter a valid email address like name@example.com.";
    }
    return null;
}

export function validateForm(form: UserInputForm): FormErrors {
    const errors: FormErrors = {};
    for (const [field, input] of Object.entries(form)) {
        if(requiredInputs.includes(field)){
            const message = validateInput(field, input);
            if (message) errors[field] = message;
        }
    }
    return errors;
}

