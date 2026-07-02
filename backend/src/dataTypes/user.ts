import { Schema } from "mongoose";
import database from "../database/database.ts";
import type { CollectionName } from "../database/databaseConstants.ts";

export class User {
    public _id: string;
    public username: string;
    public email: string;
    public phoneNumber: string;
    public roles: string[];
    public static model = database.mongoose.model("users" as CollectionName,
        new Schema({_id: String, username: String, email: String, phoneNumber: String, roles: Array}));

    constructor({_id, username, email, phoneNumber, roles}: {_id: string, username: string, email: string, phoneNumber: string, roles: string[]}) {
        this._id = _id;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.roles = roles;
    }
}

export class Resident {
    public _id: string;
    public userId: string;
    public roomId: string;
    public static model = database.mongoose.model("residents" as CollectionName,
        new Schema({_id: String, userId: String, roomId: String}));

    constructor({_id, userId, roomId}: {_id: string, userId: string, roomId: string}) {
        this._id = _id;
        this.userId = userId;
        this.roomId = roomId;
    }
}