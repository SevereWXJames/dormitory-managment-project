import mongoose, {Schema, Types} from 'mongoose';
import type {Role} from "../types/user.service.types.ts";

export interface IUser extends Document{
    _id: Types.ObjectId | null;
    name: string,
    username: string,
    email: string,
    phoneNumber: string,
    password: string,
    roles: Role[],
}

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

export const Users = mongoose.model<IUser>('users', UsersSchema);