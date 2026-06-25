import express, {type Request, type Response, type NextFunction} from "express";
import {checkLogIn, createToken, getExistingUserFromUsername} from "../services/usersServices.ts";
import type {User} from "../dataTypes/user.ts";

const loginRouter = express.Router();

loginRouter.post("/login", async (req: Request, res: Response)=> {
    let {username, password} = req.body as { username: string, password: string };

    if (username === null || password === null) {
        return res.status(400).json({success: false, message: "Invalid arguments."});
    }

    let existingUser: User;
    try {
        if (!await checkLogIn(username, password)) {
            return res.status(200).json({success: false, message: "Wrong username or password."});
        }
        existingUser = await getExistingUserFromUsername(username);
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

export default loginRouter;