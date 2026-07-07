import type {NextFunction,Response, Request} from "express";
import {verifyRequestHeader} from "./middlerware.service.ts";

//Auth Middleware
export const authenticateRequest = async (req: Request, res: Response, next: NextFunction) => {
    // get the token from the header
    try{
        await verifyRequestHeader(req);
        next();
    }catch(error){
        return res.status(500).json({
            message: "Invalid token",
            type: "error",
            error: error,
        });
    }
}

