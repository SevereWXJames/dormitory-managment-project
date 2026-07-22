import {type Request} from "express";

export const extractAccessTokenFromRequest = (req: Request) => {
    return req.cookies?.access;
}

export const extractRefreshTokenFromRequest = (req: Request) => {
    return req.cookies?.refresh;
}