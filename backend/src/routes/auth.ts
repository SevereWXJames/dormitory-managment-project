import express, {type CookieOptions, type Request, type Response} from "express";
import {
    logIn,
    signUp
} from "../services/usersServices.ts";
import {clearCookies, setAuthCookie} from "../utility/auth-utils/response.ts";

const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
    try{
        const { name, username, email, password, phoneNumber, roles } = req.body;
        const profileData = {name, username, email, password, phoneNumber, roles };
        const user = await signUp(profileData);
        setAuthCookie(user._id, user.roles, res);
        res.status(200).json({
            message: "Signed up successfully!",
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                roles: user.roles,
            },
            type: "success",
        });
    }catch(error){
        res.status(500).json({
            type: "error",
            message: "Error signing up.",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});

authRouter.post("/login", async (req: Request, res: Response)=> {
    let {username, email, password} = req.body;
    try {
        const user = await logIn(username, email, password);
        setAuthCookie(user._id, user.roles, res);
        res.status(200).json({
            success: true,
            message: "Logged in successfully!",
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                roles: user.roles,
            }
        });
    }catch(error){
        res.status(500).json({
            type: "error",
            message: "Error logging in.",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});

// Sign Out request
authRouter.post("/logout", (_req, res) => {
    // clear cookies
    clearCookies(res);
    return res.json({
        message: "Logged out successfully!",
        type: "success",
    });
});

export default authRouter;
