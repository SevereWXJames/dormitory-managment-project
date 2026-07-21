import type {Request} from "express"
import jwt from "jsonwebtoken";
import type {Role} from "../../database/types/user.service.types.ts";
import type {JWTPayload} from "../../utility/auth-utils/tokens.js";
import {extractAccessToken} from "../../utility/auth-utils/request.js";

export async function verifyRequestHeader(req: Request) {
    //Verify jwt token
    // if(!req.headers) throw Error("Invalid request!");
    // const token = req.headers['cookie']?.split("access=")[1];
    const token = extractAccessToken(req);
    if(!token) throw Error("Invalid Token!");

    const key = process.env.ACCESS_TOKEN_SECRET;
    if(!key) throw Error("Error authenticating request");

    try {
        // 2. Verify signature + expiration
        const payload = jwt.verify(token, key, {
            algorithms: ['HS256'], // pin the algorithm to avoid alg-confusion attacks
        }) as JWTPayload;
        // 3. Attach decoded payload to request for downstream use
        req.user = {id: payload.id, roles: payload.roles};
    } catch (error) {
        throw Error(`Error verifying request! ${error}`, {cause: error});
    }
}

export async function verifyRoles(req: Request, allowedRoles: Role[]){
    const {roles} = req.user;
    if(!roles) throw Error("Unauthorized request!");
    const hasPermission = roles.some((role : Role) => allowedRoles.includes(role));
    if(!hasPermission) throw Error("Insufficient permissions!");
}