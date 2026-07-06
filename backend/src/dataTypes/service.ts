import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface Service {
    _id: string;
    name: string;
    description: string;
    hasIoT: boolean;
    IoTUUID: string | null;
    IoTType: string | null;
    reservationDurationSeconds: number;
    reservationStartHour: number;
    reservationEndHour: number;
}

const serviceSchema = new Schema({_id: String, name: String, description: String, hasIoT: Boolean,
    IoTUUID: String, IoTType: String, reservationDurationSeconds: Number,
    reservationStartHour: Number, reservationEndHour: Number});
export const ServiceModel = mongoose.model("Services"  as CollectionName, serviceSchema, "Services"  as CollectionName);
