import pkg from "jsonwebtoken";
import jwt from "jsonwebtoken";
import {Types} from "mongoose";

const {sign} = pkg;

export const createJWTToken = (id: null | Types.ObjectId) => {
    if(!id) throw Error("Error, invalid id!");
    const key = process.env.ACCESS_TOKEN_SECRET;

    if(!key) throw Error("Error creating jwt token");
    return jwt.sign({userId: id}, key, {expiresIn: "7d"}); //jwt token
}

// signing the access token
export const createAccessToken = (id: string | Types.ObjectId) => {
    const key = process.env.ACCESS_TOKEN_SECRET;
    if(!key) throw Error("Error creating access token");
    return sign({ id }, key, {
        expiresIn: 15 * 60,
    });
};

// signing the refresh token
export const createRefreshToken = (id: string | Types.ObjectId) => {
    const key = process.env.ACCESS_TOKEN_SECRET;
    if(!key) throw Error("Error creating refresh token");
    return sign({ id }, key, {
        expiresIn: "90d",
    });
};