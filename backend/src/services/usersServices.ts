import userJson from "../../test_data/users.json" with {type: "json"};
import type { Request } from "express";
import jwt, {type Secret, type JwtPayload} from "jsonwebtoken";
import pkg from "jsonwebtoken";
import {compare, hash} from "bcryptjs";
import {createAccessToken, createRefreshToken} from "./utils/tokens.ts";
import {UserTable} from "../database/tableOperations/User.table.js";
import {type User, UserModel} from "../dataTypes/user.ts";

const {verify} = pkg;
const userTable : UserTable = new UserTable();
const userModel = userTable.getModel();
export async function checkLogIn(username: string | undefined, email: string | undefined, password: string | undefined): Promise<boolean> {
    if (!password || password.trim() === "") {
        return false;
    }

    const usernameUser = username ? userJson.users.find((user) => user.username === username) : undefined;
    const emailUser = email ? userJson.users.find((user) => user.email === email) : undefined;

    if (username && email) {
        return Boolean(usernameUser && emailUser && usernameUser._id === emailUser._id);
    }

    return Boolean(usernameUser ?? emailUser);
}

export async function getExistingUserFromUsername(username: string): Promise<User | undefined> {
    return UserModel.findOne({username: username}).lean().exec()
        .then((result) => {
            if (result != null) {
                return Promise.resolve(result as User);
            }
            return Promise.resolve(undefined);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}

export async function getExistingUserFromEmail(email: string): Promise<User | undefined> {
    return UserModel.findOne({email: email}).lean().exec()
        .then((result) => {
            if (result != null) {
                return Promise.resolve(result as User);
            }
            return Promise.resolve(undefined);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}

export async function getExistingUserFromId(_id: string): Promise<User | undefined> {
    return UserModel.findOne({_id: _id}).lean().exec()
        .then((result) => {
            if (result != null) {
                return Promise.resolve(result as User);
            }
            return Promise.resolve(undefined);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}

export function createToken(_id: string, username: string): string {
    let secret: string | undefined = process.env.SECRET_KEY;
    if (secret === undefined) {
        console.log("NO SECRET PROVIDED!!!");
        secret = "testvalue"; //for debug
    }
    return jwt.sign({
            _id: _id,
            username: username
        },
        secret as Secret, {expiresIn: "1h"});
}

export async function signUp(email: string, password: string, username?: string,){
    // 1. check if user already exists
    const user = await userModel.findOne({ email: email });
    // if user exists already, return error
    if (user) throw Error("User already exists! Try logging in.");
    // 2. if user doesn't exist, create a new user
    // hashing the password
    const passwordHash = await hash(password, 10);
    await userTable.createUser(email, passwordHash, username);
}

export async function signIn(email: string, password: string){
    const user = await userModel.findOne({ email: email });

    // if user doesn't exist, return error
    if (!user) throw Error("User doesn't exist!");

    // 2. if user exists, check if password is correct
    const isMatch = await compare(password, user.password);
    if(!isMatch) throw Error("Password or username is incorrect");

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    // 4. put refresh token in database
    user.refreshToken = refreshToken;
    await user.save();

    // 5. send the response
    return {refreshToken, accessToken}
}

export async function verifyRefreshToken(refreshToken: string){
    const key = process.env.REFRESH_TOKEN_SECRET;
    if(!key) throw Error("Error verifying token!");

    const payload = verify(refreshToken, key);
    if(typeof payload === "string") throw Error("Invalid payload!");

    if(!payload.id) throw Error("Invalid refresh token!");
    return payload.id;
}

export async function refreshTokens(refreshToken: string){
    if (!refreshToken) throw Error("No refresh token!");
    // if we have a refresh token, you have to verify it
    let id;
    try {
        id = verifyRefreshToken(refreshToken);
    } catch (error) {
        throw Error("Invalid refresh token!");
    }

    const user = await userModel.findById(id);
    if(!user) throw Error("User does not exist!");

    const accessToken = createAccessToken(user._id);
    const newRefreshToken = createRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    return {accessToken, newRefreshToken};
}

//Auth:
export async function verifyRequest(req: Request){
    if(!req.headers) throw Error("Invalid request!");
    // if we don't have a token, return error
    const authorization = req.headers["authorization"];
    if(authorization === undefined) throw Error("No token!");
    const token = authorization.split(" ")[1];

    const key = process.env.ACCESS_TOKEN_SECRET;
    if(!token) throw Error("Invalid token!");
    if(!key) throw Error("Invalid key!");

    let payload = verify(token, key);
    if(typeof payload == "string" || !payload.id) throw Error("Invalid payload!");
    let id = payload.id
    //Check if user exists:
    const user = await userModel.findById(id);
    if(!user) throw Error("User does not exist!");
    req.user = user;
    return user;
}