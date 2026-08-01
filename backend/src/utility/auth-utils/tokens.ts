import jwt from "jsonwebtoken";
import {Types} from "mongoose";
import type {Role} from "../../database/types/user.service.types.ts";
import {RefreshTokenModel} from "../../dataTypes/refreshTokens.ts";
import type {Response} from "express";

export type JWTPayload = {
    id: string | Types.ObjectId;
    roles: Role[];
}

// const ACCESS_EXPIRATION = "10m";
const ACCESS_EXPIRATION = "10s"; //for testing
const REFRESH_EXPIRATION = "7d";

export const createAccessToken = (id: null | Types.ObjectId, roles: Role[]) => {
    if (!id) throw Error("Error, invalid id!");
    const key = process.env.ACCESS_TOKEN_SECRET;

    if (!key) throw Error("Error creating jwt token");
    const jwtPayload: JWTPayload = {id, roles}
    return jwt.sign(
        jwtPayload,
        key,
        {expiresIn: ACCESS_EXPIRATION}); //access token
}

export const createRefreshToken = async (id: null | Types.ObjectId, roles: Role[]) => {
    if (!id) throw Error("Error, invalid id!");
    const key = process.env.REFRESH_TOKEN_SECRET;
    if (!key) throw Error("Error creating jwt token");
    try{
        const jwtPayload: JWTPayload = {id, roles}
        const refreshToken =  jwt.sign(
            jwtPayload,
            key,
            {expiresIn: REFRESH_EXPIRATION}); //refresh Token
        await updateRefreshTokenTable(id, refreshToken);
        return refreshToken;
    }catch(error){
        throw Error("Error creating refresh token!", {cause: (error as Error).message});
    }
}

export const removeRefreshTokenFromTable = async (userId: null | Types.ObjectId, refreshToken: string) => {
    try{
        const filter = {userId: userId, refreshToken: refreshToken};
        await RefreshTokenModel.findOneAndDelete(filter).exec();
    }catch(error){
        throw Error("Error removing refresh token from db", {cause: (error as Error).message});
    }
}

export const updateRefreshTokenTable =  async (userId: null | Types.ObjectId, refreshToken: string) => {
    if(!userId) throw Error("Invalid userId");
    try{
        const filter = {userId: userId, refreshToken: refreshToken};
        const update = { refreshToken: refreshToken };
        const options = { upsert: true, new: true};
        await RefreshTokenModel.findOneAndUpdate(filter, update, options).exec();
    }catch(error){
        throw Error("Error adding refresh token!", {cause: (error as Error).message});
    }
}

export const extractUserPayloadFromRefreshToken = (token : string | undefined)=> {
    if(!token) throw Error("Error, token undefined");

    const key = process.env.REFRESH_TOKEN_SECRET;
    if (!key) throw Error("Error creating jwt token");
    console.log(`token: ${token}`)
    try{
        const payload = jwt.verify(token, key, {
            algorithms: ['HS256'], // pin the algorithm to avoid alg-confusion attacks
        }) as JWTPayload;
        const {id, roles} = payload
        return {id, roles};
    }catch(error){
        throw Error("Error extracting user payload from token", {cause: (error as Error).message});
    }
}