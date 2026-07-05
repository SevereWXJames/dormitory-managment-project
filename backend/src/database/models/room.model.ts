import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const RoomSchema = new Schema({_id: String, roomName: String, verificationCode: String});

const RoomModel = mongoose.model("rooms"  as CollectionName, RoomSchema);
export default RoomModel;