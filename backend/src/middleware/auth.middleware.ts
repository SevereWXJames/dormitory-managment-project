import type {NextFunction,Response, Request} from "express";
import {verifyRequestHeader, verifyRoles} from "./services/middlerware.service.ts";
import type {Role} from "../database/types/user.service.types.ts";

//Auth Middleware
export const authenticateRequest = async (req: Request, res: Response, next: NextFunction) => {
    // get the token from the header
    try{
        console.log(`req headers: ${JSON.stringify(req.headers)}`);
        await verifyRequestHeader(req);
        next();
    }catch(error){
        return res.status(500).json({
            message: "Authentication failed",
            type: "error",
            error: (error as Error).message,
        });
    }
}

export const authorizeRole = async (req: Request, res: Response, next: NextFunction, allowedRoles: Role[]) => {
    // get the token from the header
    try{
        console.log(`req headers: ${JSON.stringify(req.headers)}`);
        await verifyRoles(req, allowedRoles);
        next();
    }catch(error){
        return res.status(500).json({
            message: "Authorization failed.",
            type: "error",
            error: (error as Error).message,
        });
    }
}

