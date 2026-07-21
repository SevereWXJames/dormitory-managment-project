import {type Request} from "express";

export const extractAccessToken = (req: Request) => {
    if(!req.headers) throw Error("Invalid request!");
    return req.headers['cookie']?.split("access=")[1];
}

export const extractRefreshToken = (req: Request) => {
    if(!req.headers) throw Error("Invalid request!");
    return req.headers['cookie']?.split("refresh=")[1];
}