import express, {type CookieOptions, type Request, type Response} from "express";
import {
    logIn,
    signUp
} from "../services/usersServices.ts";
import {createAccessToken} from "../utility/auth-utils/tokens.ts";

const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
    try{
        const { name, username, email, password, phoneNumber, roles } = req.body;
        const profileData = {name, username, email, password, phoneNumber, roles };
        const user = await signUp(profileData);
        const token = createAccessToken(user._id, user.roles);
        const cookiePayload : CookieOptions = {
            httpOnly: true,       // JS cannot read this cookie — protects against XSS
            secure: true,          // only sent over HTTPS (set false only for local http dev)
            sameSite: "strict",    // or "lax" — see note below on cross-site setups
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, matches JWT expiry
            path: "/",
        };
        res.cookie("jwt", token, cookiePayload);

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
        const token = createAccessToken(user._id, user.roles);
        res.cookie("jwt", token, {
            httpOnly: true,       // JS cannot read this cookie — protects against XSS
            secure: true,          // only sent over HTTPS (set false only for local http dev)
            sameSite: "strict",    // or "lax" — see note below on cross-site setups
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, matches JWT expiry
            path: "/",
        });
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
    res.clearCookie("jwt");
    return res.json({
        message: "Logged out successfully!",
        type: "success",
    });
});

export default authRouter;
