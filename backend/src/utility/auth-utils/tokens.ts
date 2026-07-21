import jwt from "jsonwebtoken";
import {Types} from "mongoose";
import type {Role} from "../../database/types/user.service.types.ts";

export type JWTPayload = {
    id: string | Types.ObjectId;
    roles: Role[];
}

export const createAccessToken = (id: null | Types.ObjectId, roles: Role[]) => {
    if (!id) throw Error("Error, invalid id!");
    const key = process.env.ACCESS_TOKEN_SECRET;

    if (!key) throw Error("Error creating jwt token");
    const jwtPayload: JWTPayload = {id, roles}
    return jwt.sign(
        jwtPayload,
        key,
        {expiresIn: "10m"}); //access token
}

export const createRefreshToken = (id: null | Types.ObjectId, roles: Role[]) => {
    if (!id) throw Error("Error, invalid id!");
    const key = process.env.REFRESH_TOKEN_SECRET;

    if (!key) throw Error("Error creating jwt token");
    const jwtPayload: JWTPayload = {id, roles}
    return jwt.sign(
        jwtPayload,
        key,
        {expiresIn: "7d"}); //refresh Token
}

export const validateRefreshToken = (token: string | undefined) => {
    if(!token) throw Error ("Error, undefined refresh token");

    const key = process.env.REFRESH_TOKEN_SECRET;
    if (!key) throw Error("Error validating refresh token");

    try {
        // 2. Verify signature + expiration
        jwt.verify(token, key, {
            algorithms: ['HS256'], // pin the algorithm to avoid alg-confusion attacks
        });
    } catch (error) {
        throw Error(`Error verifying request! ${error}`,
            {cause: (error as Error).message});
    }
}