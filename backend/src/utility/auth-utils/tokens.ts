import pkg from "jsonwebtoken";
import jwt from "jsonwebtoken";
import {Types} from "mongoose";
import type {Role} from "../../database/types/user.service.types.ts";

const {sign} = pkg;

export type JWTPayload = {
    id: string | Types.ObjectId;
    roles: Role[];
}

export const createJWTToken = (id: null | Types.ObjectId, roles: Role[] ) => {
    if(!id) throw Error("Error, invalid id!");
    const key = process.env.ACCESS_TOKEN_SECRET;

    if(!key) throw Error("Error creating jwt token");
    const jwtPayload : JWTPayload = {id, roles}
    return jwt.sign(
        jwtPayload,
        key,
        {expiresIn: "7d"}); //jwt token
}