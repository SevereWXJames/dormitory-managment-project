import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface Service {
    _id: string;
    name: string;
    description: string;
    hasIoT: boolean;
    IoTName: string | null;
    reservationDurationSeconds: number;
    reservationStartHour: number;
    reservationEndHour: number;
}

const serviceSchema = new Schema({_id: String, name: String, description: String, hasIoT: Boolean,
    IoTName: String, reservationDurationSeconds: Number,
    reservationStartHour: Number, reservationEndHour: Number});
export const ServiceModel = mongoose.model("services"  as CollectionName, serviceSchema);
