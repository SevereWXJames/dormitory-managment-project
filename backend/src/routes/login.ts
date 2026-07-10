import express, {type Request, type Response, type NextFunction} from "express";
import {checkLogIn, createToken, getExistingUserFromEmail, getExistingUserFromUsername} from "../services/usersServices.ts";
import type {User} from "../dataTypes/user.ts";

const loginRouter = express.Router();

loginRouter.post("/login", async (req: Request, res: Response)=> {
    let {username, email, password} = req.body as { username?: string, email?: string, password?: string };

    if ((!username || username.trim() === "") && (!email || email.trim() === "") || !password) {
        return res.status(400).json({success: false, message: "Username or email and password are required."});
    }

    let existingUser: User | undefined;
    try {
        if (!await checkLogIn(username, email, password)) {
            return res.status(401).json({success: false, message: "Wrong username/email or password."});
        }
        if (username && email) {
            const usernameUser = await getExistingUserFromUsername(username);
            const emailUser = await getExistingUserFromEmail(email);
            if (!usernameUser || !emailUser || String(usernameUser._id) !== String(emailUser._id)) {
                return res.status(401).json({success: false, message: "Wrong username/email or password."});
            }
            existingUser = usernameUser;
        } else if (username) {
            existingUser = await getExistingUserFromUsername(username);
        } else if (email) {
            existingUser = await getExistingUserFromEmail(email);
        }
        if (!existingUser) {
            return res.status(401).json({success: false, message: "Wrong username/email or password."});
        }
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error."});
    }

    let token: string;
    try {
        token = createToken(existingUser._id as string, existingUser.username);
    }
    catch (error) {
        return res.status(500).json({success: false, message: "Internal server error in JWT."});
    }

    res.status(200).json({
           _id: existingUser._id,
           username: existingUser.username,
           email: existingUser.email,
           roles: existingUser.roles,
           token: token
    });
});

export default loginRouter;