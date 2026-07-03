import { Schema } from "mongoose";
import database from "../database/database.ts";
import type { CollectionName } from "../database/databaseConstants.ts";

export class Room {
    public _id: string;
    public roomName: string;
    public verificationCode: string;
    public static model = database.mongoose.model("rooms" as CollectionName,
        new Schema({_id: String, roomName: String, verificationCode: String}));

    constructor({_id, roomName, verificationCode}: {_id: string, roomName: string, verificationCode: string}) {
        this._id = _id;
        this.roomName = roomName;
        this.verificationCode = verificationCode;
    }
}