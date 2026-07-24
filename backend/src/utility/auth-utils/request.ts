import {type Request} from "express";

export const extractAccessTokenFromRequest = (req: Request) => {
    if(!req.headers) throw Error("Invalid request!");
    return req.cookies?.access;
}

export const extractRefreshTokenFromRequest = (req: Request) => {
    if(!req.headers) throw Error("Invalid request!");
    console.log(`req-cookie: ${req.headers.cookie}`)
    return req.cookies?.refresh;
}