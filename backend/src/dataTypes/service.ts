import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface Service {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    hasIoT: boolean;
    IoTUUID: string | null;
    IoTType: string | null;
    reservationDurationSeconds: number;
    reservationStartHour: number;
    reservationEndHour: number;
}

export type ServiceInput = Omit<Service, "_id"> & { _id?: mongoose.Types.ObjectId };
const serviceSchema = new Schema({name: String, description: String, hasIoT: Boolean,
    IoTUUID: String, IoTType: String, reservationDurationSeconds: Number,
    reservationStartHour: Number, reservationEndHour: Number});
export const ServiceModel = mongoose.model("Services"  as CollectionName, serviceSchema, "Services"  as CollectionName);
