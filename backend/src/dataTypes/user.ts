import mongoose, {Document, Schema, Types} from "mongoose";
import type {Role} from "../database/types/user.service.types.ts";

export interface User extends Document{
    _id: Types.ObjectId;
    name: string,
    username: string,
    email: string,
    phoneNumber: string,
    password: string,
    roles: Role[],
}

export type UserInput = Omit<User, "_id"> & { _id?: mongoose.Types.ObjectId };

const UsersSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    username: {
        type: String,
        required: [true, "Please enter a username"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },
    phoneNumber: {
        type: String,
        required: false,
        unique: false,
    },
    roles: {
        type: Array<Role>,
        required: [true, "Please enter a role"],
        default: null
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
});

export const UserModel = mongoose.model<User>("Users", UsersSchema, "Users");

export interface Resident extends Document{
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    roomId: mongoose.Types.ObjectId | null;
}

export type ResidentInput = Omit<Resident, "_id"> & { _id?: mongoose.Types.ObjectId };

const ResidentSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'Users',
        unique: true,
        required: [true, "Please enter a userId"],
    },

    roomId: {
        type: String,
        required: false,
        default: null,
        unique: false,
    }
});

export const ResidentModel = mongoose.model<Resident>("Residents", ResidentSchema, "Residents");
