import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export type MongoId = string | mongoose.Types.ObjectId;

export interface Room {
    _id: MongoId;
    roomName: string;
    verificationCode: string;
}

export type RoomInput = Omit<Room, "_id"> & { _id?: MongoId };

const roomSchema = new Schema({roomName: String, verificationCode: String});
export const RoomModel = mongoose.model("Rooms"  as CollectionName, roomSchema, "Rooms"  as CollectionName);
