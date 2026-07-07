import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface Service {
    name: string;
    description: string;
    hasIoT: boolean;
    IoTName: string | null;
    reservationDurationSeconds: number;
    reservationStartHour: number;
    reservationEndHour: number;
}

const serviceSchema = new Schema({name: String, description: String, hasIoT: Boolean,
    IoTName: String, reservationDurationSeconds: Number,
    reservationStartHour: Number, reservationEndHour: Number});
export const ServiceModel = mongoose.model("Services"  as CollectionName, serviceSchema, "Services"  as CollectionName);
