import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const MaintenanceRequestPrioritySchema = new Schema({_id: String, text: String});

const MaintenanceRequestPriorityModel = mongoose.model("maintenance_request_priority"  as CollectionName, MaintenanceRequestPrioritySchema);
export default MaintenanceRequestPriorityModel;