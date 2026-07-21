import jwt from "jsonwebtoken";
import {Types} from "mongoose";
import type {Role} from "../../database/types/user.service.types.ts";
import type {CookieOptions, Response} from "express";

export type JWTPayload = {
    id: string | Types.ObjectId;
    roles: Role[];
}

export const setAuthCookie = (userId: null | Types.ObjectId, roles: Role[], res: Response) => {
    const accessToken = createAccessToken(userId, roles);
    const refreshToken = createRefreshToken(userId, roles);
    const cookiePayload : CookieOptions = {
        httpOnly: true,       // JS cannot read this cookie — protects against XSS
        secure: true,          // only sent over HTTPS (set false only for local http dev)
        sameSite: "strict",    // or "lax" — see note below on cross-site setups
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, matches JWT expiry
        path: "/",
    };

    res.cookie("access", accessToken, cookiePayload);
    res.cookie("refresh", refreshToken, cookiePayload);
}

export const createAccessToken = (id: null | Types.ObjectId, roles: Role[] ) => {
    if(!id) throw Error("Error, invalid id!");
    const key = process.env.ACCESS_TOKEN_SECRET;

    if(!key) throw Error("Error creating jwt token");
    const jwtPayload : JWTPayload = {id, roles}
    return jwt.sign(
        jwtPayload,
        key,
        {expiresIn: "10m"}); //access token
}

export const createRefreshToken = (id: null | Types.ObjectId, roles: Role[] ) => {
    if(!id) throw Error("Error, invalid id!");
    const key = process.env.REFRESH_TOKEN_SECRET;

    if(!key) throw Error("Error creating jwt token");
    const jwtPayload : JWTPayload = {id, roles}
    return jwt.sign(
        jwtPayload,
        key,
        {expiresIn: "7d"}); //refresh Token
}
