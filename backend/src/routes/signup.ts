import express, {type Request, type Response} from "express";
import {
    checkLogIn, createToken,
    getExistingUserFromEmail,
    getExistingUserFromUsername,
    refreshTokens,
    signIn,
    signUp
} from "../services/usersServices.ts";
import type {User} from "../dataTypes/user.js";

const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
    try{
        const { email, password } = req.body;
        const result = await signUp(email, password);
        res.status(200).json({
            result: result,
            message: "User created successfully!",
            type: "success",
        });
    }catch(error){
        res.status(500).json({
            type: "error",
            message: "Error creating user!",
            error,
        });
    }
});

authRouter.post("/signin", async (req, res) => {
    try{
        const { email, password } = req.body;
        const{refreshToken, accessToken} = await signIn(email, password);
        const cookieOptions = {httpOnly: true, secure: true, signed: true};
        res.cookie("jwt", refreshToken, cookieOptions);
        res.status(200).json({
            message: "Signed in successfully!",
            result: accessToken,
            type: "success",
        });
    }catch(error){
        res.status(500).json({
            type: "error",
            message: "Error creating signing in!",
            error,
        });
    }
});

authRouter.post("/login", async (req: Request, res: Response)=> {
    let {username, email, password} = req.body as { username?: string, email?: string, password?: string };

    if ((!username || username.trim() === "") && (!email || email.trim() === "") || !password) {
        return res.status(400).json({success: false, message: "Username or email and password are required."});
    }

    let existingUser: User | undefined;
    try {
        if (!await checkLogIn(username, email, password)) {
            return res.status(200).json({success: false, message: "Wrong username/email or password."});
        }
        if (username && email) {
            const usernameUser = await getExistingUserFromUsername(username);
            const emailUser = await getExistingUserFromEmail(email);
            if (!usernameUser || !emailUser || usernameUser._id !== emailUser._id) {
                return res.status(200).json({success: false, message: "Wrong username/email or password."});
            }
            existingUser = usernameUser;
        } else if (username) {
            existingUser = await getExistingUserFromUsername(username);
        } else if (email) {
            existingUser = await getExistingUserFromEmail(email);
        }
        if (!existingUser) {
            return res.status(200).json({success: false, message: "Wrong username/email or password."});
        }
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }

    let token: string;
    try {
        token = createToken(existingUser._id, existingUser.username);
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error in JWT."});
    }

    res.status(200).json({
        success: true,
        data: {
            _id: existingUser._id,
            username: username,
            email: existingUser.email,
            roles: existingUser.roles,
            token: token
        }
    });
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

// Refresh Token request:
authRouter.post("/refresh_token", async (req, res) => {
    try{
        const { refreshToken } = req.cookies;
        const result = await refreshTokens(refreshToken);

        const cookieOptions = {httpOnly: true, secure: true, signed: true};
        res.cookie("jwt", result.newRefreshToken, cookieOptions);
        res.status(200).json({
            message: "Refreshed successfully!",
            result: result.accessToken,
            type: "success",
        });

    }catch(error){
        res.status(500).json({
            type: "error",
            message: "Error refreshing token!",
            error,
        });
    }
});

export default authRouter;
