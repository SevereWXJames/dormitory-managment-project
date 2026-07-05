import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const ResidentSchema = new Schema({_id: String, userId: String, roomId: String});

const ResidentModel = mongoose.model("residents"  as CollectionName, ResidentSchema);
export default ResidentModel;