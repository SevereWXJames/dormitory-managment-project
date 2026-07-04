import type { Request, Response, NextFunction } from "express";
import { verifyToken} from "./auth.utils.ts";
import type {JwtPayload} from "jsonwebtoken";

// Extend Express's Request type so req.user is typed downstream.
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization; // expected: "Bearer <token>"

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Missing or malformed Authorization header." });
    }

    const token = authHeader.slice("Bearer ".length);

    try {
        req.user = verifyToken(token);
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
}