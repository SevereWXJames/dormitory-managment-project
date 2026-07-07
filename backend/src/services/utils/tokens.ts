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