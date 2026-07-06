import type {NextFunction,Response, Request} from "express";
import {verifyRequest} from "../usersServices.js";

//Auth Middleware
export const auth = async (req: Request, res: Response, next: NextFunction) => {
    // get the token from the header
    try{
        await verifyRequest(req);
        next();
    }catch(error){
        return res.status(500).json({
            message: "Invalid token",
            type: "error",
            error: error,
        });
    }
}