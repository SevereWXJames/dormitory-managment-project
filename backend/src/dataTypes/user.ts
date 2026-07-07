import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";
import {Users} from "../database/models/users.model.ts";
import {Residents} from "../database/models/residents.model.ts";

export interface User {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    roles: string[];
}

//const userSchema = new Schema({_id: String, username: String, email: String, phoneNumber: String, roles: Array});
// export const UserModel = mongoose.model("Users"  as CollectionName, userSchema, "Users"  as CollectionName);
export const UserModel = Users;

export interface Resident {
    _id: string;
    userId: string;
    roomId: string;
}

// const residentSchema = new Schema({_id: String, userId: String, roomId: String});
// export const ResidentModel = mongoose.model("Residents"  as CollectionName, residentSchema, "Residents"  as CollectionName);

export const ResidentModel = Residents;
