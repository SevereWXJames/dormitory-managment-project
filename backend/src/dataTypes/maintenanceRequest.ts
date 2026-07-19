import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface MaintenanceRequest {
    _id: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    title: string;
    description: string;
    type: string;
    status: string;
    priority: string;
    location: string | null;
}

export type MaintenanceRequestInput = Omit<MaintenanceRequest, "_id"> & { _id?: mongoose.Types.ObjectId };

const maintenanceRequestSchema = new Schema({
    createdBy: mongoose.Types.ObjectId, title: String, description: String, type: String, status: String,
    priority: String, location: String
});
export const MaintenanceRequestModel = mongoose.model("MaintenanceRequests" as CollectionName, maintenanceRequestSchema, "MaintenanceRequests" as CollectionName);

export interface MaintenanceRequestType {
    _id: string;
    text: string;
}

const maintenanceRequestTypeSchema = new Schema({_id: String, text: String});
export const MaintenanceRequestTypeModel = mongoose.model("MaintenanceRequestTypes"  as CollectionName, maintenanceRequestTypeSchema, "MaintenanceRequestTypes"  as CollectionName);

export interface MaintenanceRequestStatus {
    _id: string;
    text: string;
    order?: number;
}

const maintenanceRequestStatusSchema = new Schema({_id: String, text: String, order: Number});
export const MaintenanceRequestStatusModel = mongoose.model("MaintenanceRequestStatuses"  as CollectionName, maintenanceRequestStatusSchema, "MaintenanceRequestStatuses"  as CollectionName);


export interface MaintenanceRequestPriority {
    _id: string;
    text: string;
}

const maintenanceRequestPrioritySchema = new Schema({_id: String, text: String});
export const MaintenanceRequestPriorityModel = mongoose.model("MaintenanceRequestPriorities"  as CollectionName, maintenanceRequestPrioritySchema, "MaintenanceRequestPriorities"  as CollectionName);