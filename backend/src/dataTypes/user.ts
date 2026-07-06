import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface User {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    roles: string[];
}

const userSchema = new Schema({_id: String, username: String, email: String, phoneNumber: String, roles: Array});
export const UserModel = mongoose.model("Users"  as CollectionName, userSchema, "Users"  as CollectionName);

export interface Resident {
    _id: string;
    userId: string;
    roomId: string;
}

const residentSchema = new Schema({_id: String, userId: String, roomId: String});
export const ResidentModel = mongoose.model("Residents"  as CollectionName, residentSchema, "Residents"  as CollectionName);
