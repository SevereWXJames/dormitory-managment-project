import express, {type CookieOptions, type Request, type Response} from "express";
import {
    getExistingUserFromId, getUserByQuery,
    logIn,
    signUp
} from "../services/usersServices.ts";
import {createJWTToken} from "../utility/auth-utils/tokens.ts";

const authRouter = express.Router();

authRouter.post("/refresh", async(req, res) => {
    try{
        const refreshToken = extractRefreshTokenFromRequest(req);
        const {id, roles} = extractUserPayloadFromRefreshToken(refreshToken);
        const userId = id as Types.ObjectId;
        const filter = {_id: id};
        const user = await getUserByQuery(filter);
        console.log(`user: ${JSON.stringify(user, null, 2)}`)
        await setAuthCookie(userId, roles, res);
        res.status(200).json({
            message: "Refresh token successfully!",
            data: {
                _id: user._id,
                username: user.username,
                email: user.email,
                roles: user.roles,
            },
            type: "success"
        });
    }catch(error){
        res.status(500).json({
            type: "error",
            message: "Error refreshing token",
            error: error instanceof Error ? error.message : String(error),
        });
    }
});

authRouter.post("/signup", async (req, res) => {
    try{
        const { name, username, email, password, phoneNumber, roles } = req.body;
        const profileData = {name, username, email, password, phoneNumber, roles };
        // Prevent unauthenticated or unauthorized users from creating ADMIN accounts.
        if (Array.isArray(roles) && roles.includes(Role.ADMIN)) {
            try {
                await verifyRequestHeader(req);
                await verifyRoles(req, [Role.ADMIN]);
            } catch (authErr) {
                const message = authErr instanceof Error ? authErr.message : String(authErr);
                const statusCode = /Insufficient permissions|Unauthorized request/.test(message) ? 403 : 401;
                return res.status(statusCode).json({
                    type: "error",
                    message: "Authorization failed.",
                    error: message,
                });
            }
        }

        const user = await signUp(profileData);
        await setAuthCookie(user._id, user.roles, res);
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
        const message = error instanceof Error ? error.message : String(error);
        const statusCode = /required|invalid email|not match|not found|incorrect password|already exists|failed to create account|unable to update/i.test(message) ? 400 : 500;
        res.status(statusCode).json({
            type: "error",
            message,
            error: message,
        });
    }
});

authRouter.post("/login", async (req: Request, res: Response)=> {
    let {username, email, password} = req.body;
    try {
        const user = await logIn(username, email, password);
        await setAuthCookie(user._id, user.roles, res);
        res.status(200).json({
            message: "Logged in successfully!",
            data: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                roles: user.roles
            },
            type: "success"
        });
    }catch(error){
        const message = error instanceof Error ? error.message : String(error);
        const statusCode = /required|invalid email|not match|not found|incorrect password/i.test(message) ? 400 : 500;
        res.status(statusCode).json({
            type: "error",
            message,
            error: message,
        });
    }
});

// Sign Out request
authRouter.post("/logout", async (req, res) => {
    // clear cookies
    try{
        await clearCookies(req, res);
        return res.json({
            message: "Logged out successfully!",
            type: "success",
        });
    }catch(error){
        res.status(500).json({
            type: "error",
            message: "Error logging out.",
            error: error instanceof Error ? error.message : String(error),
        })
    }

});

export default authRouter;
