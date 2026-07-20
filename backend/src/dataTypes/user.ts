import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";
import {Users} from "../database/models/users.model.ts";
import {Residents} from "../database/models/residents.model.ts";

export type MongoId = string | mongoose.Types.ObjectId;

export interface User {
    _id: MongoId;
    username: string;
    email: string;
    phoneNumber: string;
    roles: string[];
}

export type UserInput = Omit<User, "_id"> & { _id?: MongoId };

// const userSchema = new Schema({username: String, email: String, phoneNumber: String, roles: Array});
// export const UserModel = mongoose.model("Users"  as CollectionName, userSchema, "Users"  as CollectionName);
export const UserModel = Users;

export interface Resident {
    _id: MongoId;
    userId: string;
    roomId: string;
}

export type ResidentInput = Omit<Resident, "_id"> & { _id?: MongoId };

const residentSchema = new Schema({_id: String, userId: String, roomId: String});
//export const ResidentModel = mongoose.model("Residents"  as CollectionName, residentSchema, "Residents"  as CollectionName);
export const ResidentModel = Residents;
