import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.js";

export interface User {
    _id: string;
    username: string;
    email: string;
    phoneNumber: string;
    roles: string[];
}

const userSchema = new Schema({_id: String, username: String, email: String, phoneNumber: String, roles: Array});
export const UserModel = mongoose.model("users"  as CollectionName, userSchema);

export interface Resident {
    _id: string;
    userId: string;
    roomId: string;
}

const residentSchema = new Schema({_id: String, userId: String, roomId: String});
export const ResidentModel = mongoose.model("residents"  as CollectionName, residentSchema);
