import {Types} from "mongoose";
import {
    createAccessToken,
    createRefreshToken,
    extractUserPayloadFromRefreshToken,
    removeRefreshTokenFromTable
} from "./tokens.ts";
import type {CookieOptions, Response} from "express";
import type {Role} from "../../database/types/user.service.types.ts";

export const setAuthCookie = async (userId: null | Types.ObjectId, roles: Role[], res: Response) => {
    try{
        const accessToken = createAccessToken(userId, roles);
        const refreshToken = await createRefreshToken(userId, roles);
        console.log(`refresh token: ${refreshToken}`);
        const cookiePayload : CookieOptions = {
            httpOnly: true,       // JS cannot read this cookie — protects against XSS
            secure: true,          // only sent over HTTPS (set false only for local http dev)
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

export const clearCookies = async (res: Response) => {
    const refreshToken = extractRefreshTokenFromResponse(res);
    if(!refreshToken) throw Error("Error extracting refresh token from response");
    try{
        const {id} = extractUserPayloadFromRefreshToken(refreshToken);
        const userId = id ? new Types.ObjectId(id) : null;
        await removeRefreshTokenFromTable(userId, refreshToken);
        res.clearCookie("access");
        res.clearCookie("refresh");
    }catch(error){
        throw Error("Error clearing cookies", {cause: (error as Error).message});
    }
}

export const extractRefreshTokenFromResponse = (res: Response) => {
    const cookies = res.header('set-cookie') as unknown as string[];
    const rawCookie = cookies.find((c) => c.startsWith('access='));
    return rawCookie?.split(';')[0];
}


