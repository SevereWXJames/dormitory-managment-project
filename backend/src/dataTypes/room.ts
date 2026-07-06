import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface Room {
    _id: string;
    roomName: string;
    verificationCode: string;
}

const roomSchema = new Schema({_id: String, roomName: String, verificationCode: String});
export const RoomModel = mongoose.model("Rooms"  as CollectionName, roomSchema, "Rooms"  as CollectionName);
