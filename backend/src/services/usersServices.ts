import jwt,{type Secret} from "jsonwebtoken";
import {type User, UserModel} from "../dataTypes/user.ts";

export async function checkLogIn(username: string | undefined, email: string | undefined, password: string | undefined): Promise<boolean> {
    if (!password || password.trim() === "") {
        return false;
    }

    if (username && email) {
        const [usernameUser, emailUser] = await Promise.all([
            UserModel.findOne({ username }).lean().exec(),
            UserModel.findOne({ email }).lean().exec()
        ]);

        if (!usernameUser || !emailUser) {
            return false;
        }
        return String(usernameUser._id) === String(emailUser._id);
    }

    if (username) {
        const user = await UserModel.findOne({ username }).lean().exec();
        return Boolean(user);
    }

    if (email) {
        const user = await UserModel.findOne({ email }).lean().exec();
        return Boolean(user);
    }

    return false;
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