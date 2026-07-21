import {type Request} from "express";

export const extractAccessTokenFromRes = (req: Request) => {
    if(!req.headers) throw Error("Invalid request!");
    return req.headers['cookie']?.split("access=")[1];
}

export const extractRefreshTokenFromReq = (req: Request) => {
    if(!req.headers) throw Error("Invalid request!");
    return req.headers['cookie']?.split("refresh=")[1];
}