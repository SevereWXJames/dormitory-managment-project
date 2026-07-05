import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const maintenanceRequestTypeSchema = new Schema({_id: String, text: String});

const MaintenanceRequestTypeModel = mongoose.model("maintenance_request_type"  as CollectionName, maintenanceRequestTypeSchema);
export default MaintenanceRequestTypeModel;