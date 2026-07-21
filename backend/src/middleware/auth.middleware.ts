import type {NextFunction,Response, Request} from "express";
import {verifyRequestHeader, verifyRoles} from "./services/middleware.service.ts";
import type {Role} from "../database/types/user.service.types.ts";
import {TokenExpiredError} from "jsonwebtoken";

//Auth Middleware
export const authenticateRequest = async (req: Request, res: Response, next: NextFunction) => {
    // get the token from the header
    try{
        await verifyRequestHeader(req);
        next();
    }catch(error){
        if(error instanceof TokenExpiredError)
            return res.status(401).json({message: "Token expired"})
        return res.status(500).json({
            message: "Authentication failed",
            type: "error",
            error: (error as Error).message,
        });
    }
}

export const checkRole = async (requiredRoles: Role[], req: Request, res: Response, next: NextFunction ) => {
    try{
        await verifyRoles(req, requiredRoles);
        next();
    }catch(error){
        return res.status(500).json({
            message: "Authorization failed.",
            type: "error",
            error: (error as Error).message,
        });
    }
}

export const requireRole = (... requiredRoles: Role[]) => {
    // get the token from the header
    return async (req: Request, res: Response, next: NextFunction) => {
        return await checkRole(requiredRoles, req, res, next);
    }
}

