import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const roomSchema = new Schema({_id: String, roomName: String, verificationCode: String});

const RoomModel = mongoose.model("rooms"  as CollectionName, roomSchema);
export default RoomModel;