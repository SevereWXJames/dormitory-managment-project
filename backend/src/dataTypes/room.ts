import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface Room {
    roomName: string;
    verificationCode: string;
}

const roomSchema = new Schema({roomName: String, verificationCode: String});
export const RoomModel = mongoose.model("Rooms"  as CollectionName, roomSchema, "Rooms"  as CollectionName);
