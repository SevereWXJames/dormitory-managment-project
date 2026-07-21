import express, {type Request, type Response} from "express";
import {
    logIn,
    signUp
} from "../services/usersServices.ts";
import {createJWTToken} from "../utility/auth-utils/tokens.ts";

const authRouter = express.Router();

function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        const nestedCause = (error as Error & {cause?: unknown}).cause;
        if (nestedCause) {
            return getErrorMessage(nestedCause);
        }
        return error.message;
    }

    return String(error);
}

function getStatusCode(message: string): number {
    const normalizedMessage = message.toLowerCase();
    const isValidationError = [
        "required",
        "not found",
        "invalid email",
        "incorrect password",
        "do not match",
        "already exists",
        "already in use",
    ].some((indicator) => normalizedMessage.includes(indicator));

    return isValidationError ? 400 : 500;
}

authRouter.post("/signup", async (req, res) => {
    try{
        const { name, username, email, password, phoneNumber, roles } = req.body;
        const profileData = {name, username, email, password, phoneNumber, roles };
        const user = await signUp(profileData);
        const token = createJWTToken(user._id, user.roles);
        res.cookie("jwt", token, {
            httpOnly: true,       // JS cannot read this cookie — protects against XSS
            secure: true,          // only sent over HTTPS (set false only for local http dev)
            sameSite: "strict",    // or "lax" — see note below on cross-site setups
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, matches JWT expiry
            path: "/",
        });

        res.status(200).json({
            message: "Signed up successfully!",
            data: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                roles: user.roles,
            },
            type: "success",
        });
    }catch(error){
        const message = getErrorMessage(error);
        const status = getStatusCode(message);
        res.status(status).json({
            type: "error",
            message: message,
            error: message,
        });
    }
});

authRouter.post("/login", async (req: Request, res: Response)=> {
    let {username, email, password} = req.body;
    try {
        const user = await logIn(username, email, password);
        const token = createJWTToken(user._id, user.roles);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });
        res.status(200).json({
            success: true,
            message: "Logged in successfully!",
            data: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                roles: user.roles,
            }
        });
    }catch(error){
        const message = getErrorMessage(error);
        const status = getStatusCode(message);
        res.status(status).json({
            type: "error",
            // expose the specific error message to the caller so the frontend
            // can display field-specific guidance (e.g. "Incorrect password.")
            message: message,
            error: message,
        });
    }
});

// Sign Out request
authRouter.post("/logout", (_req, res) => {
    // clear cookies
    res.clearCookie("jwt");
    return res.json({
        message: "Logged out successfully!",
        type: "success",
    });
});

export default authRouter;
