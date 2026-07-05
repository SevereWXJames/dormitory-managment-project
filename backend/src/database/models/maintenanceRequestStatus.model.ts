import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const maintenanceRequestStatusSchema = new Schema({_id: String, text: String});

const maintenanceRequestStatusModel = mongoose.model("maintenance_request_status"  as CollectionName, maintenanceRequestStatusSchema);
export default maintenanceRequestStatusModel;