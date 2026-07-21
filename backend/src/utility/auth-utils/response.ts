import {Types} from "mongoose";
import {createAccessToken, createRefreshToken} from "./tokens.ts";
import type {CookieOptions, Response} from "express";
import type {Role} from "../../database/types/user.service.types.ts";

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

export const clearCookies = (res: Response) => {
    res.clearCookie("access");
    res.clearCookie("refresh");
}