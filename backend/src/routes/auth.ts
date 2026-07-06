import express, {type Request, type Response} from "express";
import {
    logIn,
    signUp
} from "../services/usersServices.ts";
import {createJWTToken} from "../services/utils/tokens.ts";

const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
    try{
        const { name, username, email, password, phoneNumber, roles } = req.body;
        const profileData = {name, username, email, password, phoneNumber, roles };
        const user = await signUp(profileData);
        const token = createJWTToken(user._id);
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
        const token = createJWTToken(user._id);
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

//
// authRouter.post("/login", async (req: Request, res: Response)=> {
//     let {username, email, password} = req.body as { username?: string, email?: string, password?: string };
//
//     if ((!username || username.trim() === "") && (!email || email.trim() === "") || !password) {
//         return res.status(400).json({success: false, message: "Username or email and password are required."});
//     }
//
//     let existingUser: User | undefined;
//     try {
//         if (!await checkLogIn(username, email, password)) {
//             return res.status(200).json({success: false, message: "Wrong username/email or password."});
//         }
//         if (username && email) {
//             const usernameUser = await getExistingUserFromUsername(username);
//             const emailUser = await getExistingUserFromEmail(email);
//             if (!usernameUser || !emailUser || usernameUser._id !== emailUser._id) {
//                 return res.status(200).json({success: false, message: "Wrong username/email or password."});
//             }
//             existingUser = usernameUser;
//         } else if (username) {
//             existingUser = await getExistingUserFromUsername(username);
//         } else if (email) {
//             existingUser = await getExistingUserFromEmail(email);
//         }
//         if (!existingUser) {
//             return res.status(200).json({success: false, message: "Wrong username/email or password."});
//         }
//     }
//     catch (error) {
//         return res.status(500).json({success: false, message: "Internal server error."});
//     }
//
//     let token: string;
//     try {
//         token = createToken(existingUser._id.toString(), existingUser.username);
//     }
//     catch (error) {
//         return res.status(500).json({success: false, message: "Internal server error in JWT."});
//     }
//
//     res.status(200).json({
//         success: true,
//         data: {
//             _id: existingUser._id,
//             username: username,
//             email: existingUser.email,
//             roles: existingUser.roles,
//             token: token
//         }
//     });
// });


export default authRouter;
