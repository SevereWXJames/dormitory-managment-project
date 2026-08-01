import {Types} from "mongoose";
import {
    createAccessToken,
    createRefreshToken,
    extractUserPayloadFromRefreshToken,
    removeRefreshTokenFromTable
} from "./tokens.ts";
import type {CookieOptions, Response, Request} from "express";
import type {Role} from "../../database/types/user.service.types.ts";
import {extractRefreshTokenFromRequest} from "./request.ts";

export const setAuthCookie = async (userId: null | Types.ObjectId, roles: Role[], res: Response) => {
    try{
        const accessToken = createAccessToken(userId, roles);
        const refreshToken = await createRefreshToken(userId, roles);
        const cookiePayload : CookieOptions = {
            httpOnly: true,       // JS cannot read this cookie — protects against XSS
            secure: process.env.NODE_ENV === "production",          // only sent over HTTPS (set false only for local http dev)
            sameSite: "strict",    // or "lax" — see note below on cross-site setups
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, matches JWT expiry
            path: "/",
        };
        res.cookie("access", accessToken, cookiePayload);
        res.cookie("refresh", refreshToken, cookiePayload);
    }catch(error){
        throw Error("Error setting cookie", {cause: (error as Error).message});
    }
}

export const clearCookies = async (req: Request, res: Response) => {
    const clearOptions: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    };
    res.clearCookie("access", clearOptions);
    res.clearCookie("refresh", clearOptions);

    const refreshToken = extractRefreshTokenFromRequest(req);
    if(!refreshToken) throw Error("Error extracting refresh token from request");

    try{
        const {id} = extractUserPayloadFromRefreshToken(refreshToken);
        const userId = id ? new Types.ObjectId(id) : null;
        await removeRefreshTokenFromTable(userId, refreshToken);
    }catch(error){
        throw Error("Error clearing cookies", {cause: (error as Error).message});
    }
}


