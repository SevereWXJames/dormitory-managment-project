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

export const extractUserPayloadFromToken = (token : string)=> {
    const key = process.env.REFRESH_TOKEN_SECRET;
    if (!key) throw Error("Error creating jwt token");

    try{
        const payload = jwt.verify(token, key, {
            algorithms: ['HS256'], // pin the algorithm to avoid alg-confusion attacks
        }) as JWTPayload;
        const {id, roles} = payload
        return {id, roles};
    }catch(error){
        throw Error("Error extracting user payload from token", {cause: (error as Error).message});
    }
}