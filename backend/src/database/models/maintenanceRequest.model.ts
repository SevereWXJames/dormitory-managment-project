import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const maintenanceRequestSchema = new Schema({
    _id: String, createdBy: String, title: String, description: String, type: String, status: String,
    priority: String, location: String
});

const MaintenanceRequest = mongoose.model("maintenance_request" as CollectionName, maintenanceRequestSchema);
export default MaintenanceRequest;