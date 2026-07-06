//import userJson from "../../test_data/users.json" with {type: "json"};
import type {Request} from "express";
import {UserTable} from "../database/tableOperations/User.table.ts";
import type {SignUpRequest} from "../database/types/user.service.types.ts";
import {compare, hash} from "bcryptjs";
import {type User, UserModel} from "../dataTypes/user.ts";
import jwt from "jsonwebtoken";
import pkg, {type Secret} from "jsonwebtoken";

const {verify} = pkg;
const userTable : UserTable = new UserTable();
const userModel = userTable.getModel();

// export async function checkLogIn(username: string | undefined, email: string | undefined, password: string | undefined): Promise<boolean> {
//     if (!password || password.trim() === "") {
//         return false;
//     }
//
//     const usernameUser = username ? userJson.users.find((user) => user.username === username) : undefined;
//     const emailUser = email ? userJson.users.find((user) => user.email === email) : undefined;
//
//     if (username && email) {
//         return Boolean(usernameUser && emailUser && usernameUser._id === emailUser._id);
//     }
//
//     return Boolean(usernameUser ?? emailUser);
// }

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

//Looks for account, verifies information, returns user.
export async function logIn(username: string, email: string, password: string){
    const passwordHash = await hash(password, 10);
    const userDocs = await userModel.findOne({username, email, password: passwordHash});
    if(!userDocs) throw Error("Invalid username, email, or password");
    return userDocs;
}

//Creates a new user account and returns the newly created user.
export async function signUp(profileData : SignUpRequest){
    const {username, password, email} = profileData;

    const user = await userModel.findOne({username, email});
    if (user) throw Error("User already exists! Try logging in.");

    try{
        profileData.password = await hash(password, 10);
        await userTable.createUser(profileData);
    }catch (error){
        throw Error("Error creating account", {cause: error});
    }


    // Check that the account has been created
    const userDoc = await userTable.findNewlyCreatedUser(profileData);
    if(!userDoc[0] || userDoc.length <= 0) throw Error("Error, failed to create account");
    return userDoc[0];
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