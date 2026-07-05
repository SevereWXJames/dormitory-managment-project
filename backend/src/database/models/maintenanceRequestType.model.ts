import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const MaintenanceRequestTypeSchema = new Schema({_id: String, text: String});

const MaintenanceRequestTypeModel = mongoose.model("maintenance_request_type"  as CollectionName, MaintenanceRequestTypeSchema);
export default MaintenanceRequestTypeModel;