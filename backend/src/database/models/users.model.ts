import mongoose, {Schema} from 'mongoose';
import type {Role} from "../types/roles.types.js";

export interface IUser extends Document{
    username: string,
    email: string,
    phoneNumber: number,
    password: string,
    roles: string[],
    refreshToken: string
}

const UsersSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: false
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: false,
        unique: true
    },
    roles: {
        type: Array<Role>,
        required: true,
        default: []
    },
    password: {
        type: String,
        required: [true, "Please enter a password"]
    },
    refreshToken: {
        type: String,
    }
});

export const Users = mongoose.model<IUser>('users', UsersSchema);