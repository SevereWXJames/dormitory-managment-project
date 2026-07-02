import userJson from "../../test_data/users.json" with {type: "json"};
import jwt,{type Secret} from "jsonwebtoken";
import type {User} from "../dataTypes/user.ts";

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
    return userJson.users.find((user) => user.username === username) as User | undefined;
}

export async function getExistingUserFromEmail(email: string): Promise<User | undefined> {
    return userJson.users.find((user) => user.email === email) as User | undefined;
}

export async function getExistingUserFromId(_id: string): Promise<User> {
    const testUser = userJson.users.find((user) => {
        return user._id === _id;
    });
    return testUser as User;
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