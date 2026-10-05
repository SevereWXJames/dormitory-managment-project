import type {Request} from "express"
import jwt from "jsonwebtoken";
import pkg from "jsonwebtoken";
import type {Role} from "../../database/types/user.service.types.ts";
import type {JWTPayload} from "../../utility/auth-utils/tokens.ts";
import {extractAccessTokenFromRequest, extractRefreshTokenFromRequest} from "../../utility/auth-utils/request.ts";

export const {TokenExpiredError, JsonWebTokenError} = pkg;

export async function verifyRequestHeader(req: Request) {
    const token = extractAccessTokenFromRequest(req);
    if (!token) throw Error("Invalid Token!");

    const key = process.env.ACCESS_TOKEN_SECRET;
    if (!key) throw Error("Error authenticating request");

    try {
        // 2. Verify signature + expiration
        const payload = jwt.verify(token, key, {
            algorithms: ['HS256'], // pin the algorithm to avoid alg-confusion attacks
        }) as JWTPayload;
        // 3. Attach decoded payload to request for downstream use
        req.user = {id: payload.id, roles: payload.roles};
    } catch (error) {
        if(error instanceof TokenExpiredError) throw error;
        throw Error(`Error verifying request! ${error}`, {cause: error});
    }
}

export async function verifyRoles(req: Request, allowedRoles: Role[]){
    const {roles} = req.user;
    if(!roles) throw Error("Unauthorized request!");
    const hasPermission = roles.some((role : Role) => allowedRoles.includes(role));
    if(!hasPermission) throw Error("Insufficient permissions!");
}

export const validateRefreshToken = (req: Request) => {
    const token = extractRefreshTokenFromRequest(req);
    if(!token) throw Error ("Error, undefined refresh token");

    const key = process.env.REFRESH_TOKEN_SECRET;
    if (!key) throw Error("Error validating refresh token");

    try {
        // 2. Verify signature + expiration
        jwt.verify(token, key, {
            algorithms: ['HS256'], // pin the algorithm to avoid alg-confusion attacks
        });
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            throw new TokenExpiredError(error.message, error.expiredAt);
        }
        if (error instanceof JsonWebTokenError) {
            throw new JsonWebTokenError(error.message);
        }
        // fallback for anything unexpected
        throw new Error(`Error verifying refresh token: ${(error as Error).message}`, {
            cause: (error as Error).message,
        });
    }
}