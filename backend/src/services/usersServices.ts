import userJson from "../../test_data/users.json" with {type: "json"};
import jwt,{type Secret} from "jsonwebtoken";
import type {User} from "../dataTypes/user.ts";

export async function checkLogIn(username: string, password: string, ): Promise<boolean> {
    return true;
}

export async function getExistingUserFromUsername(username: string): Promise<User> {
    const testUser = userJson.users.find((user) => {
        return user.username === username;
    });
    return testUser as User;
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