import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface Room {
    _id: mongoose.Types.ObjectId;
    roomName: string;
    verificationCode: string;
}

export type RoomInput = Omit<Room, "_id"> & { _id?: mongoose.Types.ObjectId };

const roomSchema = new Schema({roomName: String, verificationCode: String});
export const RoomModel = mongoose.model("Rooms"  as CollectionName, roomSchema, "Rooms"  as CollectionName);
