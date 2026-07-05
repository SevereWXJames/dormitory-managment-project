import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const residentSchema = new Schema({_id: String, userId: String, roomId: String});

const ResidentModel = mongoose.model("residents"  as CollectionName, residentSchema);
export default ResidentModel;