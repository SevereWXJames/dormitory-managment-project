//import userJson from "../../test_data/users.json" with {type: "json"};
import type {Request} from "express";
import {UserTable} from "../database/tableOperations/User.table.ts";
import {Role} from "../database/types/user.service.types.ts";
import type {SignUpRequest} from "../database/types/user.service.types.ts";
import {compare, hash} from "bcryptjs";
import {type User, UserModel, ResidentModel} from "../dataTypes/user.ts";
import pkg, {type Secret} from "jsonwebtoken";
import mongoose, {Types} from "mongoose";
import {ResidentTable} from "../database/tableOperations/Resident.table.ts";
import {CreditBalanceTable} from "../database/tableOperations/CreditBalance.table.ts";

const {verify} = pkg;
const userTable: UserTable = new UserTable();
const residentTable: ResidentTable = new ResidentTable();
const creditBalanceTable: CreditBalanceTable = new CreditBalanceTable();
const userModel = userTable.getModel();

export async function getExistingUserFromUsername(username: string): Promise<User | undefined> {
    return UserModel.findOne({username: username}).lean().exec()
        .then((result) => {
            if (result) {
                return Promise.resolve(result as unknown as User);
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
            if (result) {
                return Promise.resolve(result as unknown as User);
            }
            return Promise.resolve(undefined);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}

export async function getExistingUserFromId(_id: mongoose.Types.ObjectId): Promise<User | undefined> {
    try {
        const id = new Types.ObjectId(_id);
        const doc = await UserModel.findOne({_id: id }).lean().exec();
        if (!doc) return undefined;
        return { ...doc, _id: doc._id.toString() } as unknown as User;
    } catch (error) {
        throw Error(`Error finding user!`, {cause: error});
    }
}

//Looks for account, verifies information, returns user.
export async function logIn(username: string, email: string, password: string) {
    const normalizedUsername = username ? username.trim() : "";
    const normalizedEmail = email ? email.trim().toLowerCase() : "";

    if (normalizedUsername === "") {
        throw Error("Username is required.");
    }
    if (normalizedEmail === "") {
        throw Error("Email is required.");
    }
    if (!password) {
        throw Error("Password is required.");
    }

    const simpleEmailRegex = /^\S+@\S+\.\S+$/;
    if (!simpleEmailRegex.test(normalizedEmail)) {
        throw Error("Please enter a valid email address like name@example.com.");
    }

    const user = await userModel.findOne({ username: normalizedUsername, email: normalizedEmail });
    if (!user) throw Error("Username and email do not match any account.");

    const isMatch = await compare(password, user.password);
    if (!isMatch) throw Error("Incorrect password.");

    return user;
}

//Helpers for signup
async function createNewBalance(userId: Types.ObjectId) {
    try {
        await creditBalanceTable.createBalance(userId);
    } catch (error) {
        throw Error("Error creating balance", {cause: error});
    }
}

async function createNewResident(userId: Types.ObjectId) {
    try {
        await residentTable.createResident(userId);
    } catch (error) {
        throw Error("Error creating resident", {cause: error});
    }
}

//Creates a new user account and returns the newly created user.
export async function signUp(profileData: SignUpRequest) {
    const {username, password, email, roles} = profileData;

    if (!username || username.trim() === "") {
        throw Error("Username is required.");
    }
    if (!password || password.trim() === "") {
        throw Error("Password is required.");
    }
    if (!email || email.trim() === "") {
        throw Error("Email is required.");
    }

    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    // Basic validation for email format
    const simpleEmailRegex = /^\S+@\S+\.\S+$/;
    if (!simpleEmailRegex.test(normalizedEmail)) {
        throw Error("Please enter a valid email address like name@example.com.");
    }

    // Ensure the email is unique for the account
    const existingByEmail = await userModel.findOne({ email: normalizedEmail });
    if (existingByEmail) {
        throw Error("An account with this email already exists. Please use a different email address.");
    }

    profileData.username = normalizedUsername;
    profileData.email = normalizedEmail;

    try {
        profileData.password = await hash(password, 10);
        await userTable.createUser(profileData);
    } catch (error) {
        throw Error("Error creating account", {cause: error});
    }
    // Check that the account has been created
    const userDoc = await userTable.findNewlyCreatedUser(profileData);
    if (!userDoc || !userDoc._id) throw Error("Error, failed to create account");

    // Create new rows if role is Resident
    try {
        if (roles.includes(Role.RESIDENT)) {
            await createNewResident(userDoc._id);
            await createNewBalance(userDoc._id);
        }
    } catch (error) {
        throw Error("Unable to update references in other tables", {cause: error});
    }
    return userDoc;
}
