import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export type MongoId = string | mongoose.Types.ObjectId;

export interface Service {
    _id: MongoId;
    name: string;
    description: string;
    hasIoT: boolean;
    IoTName: string | null;
    reservationDurationSeconds: number;
    reservationStartHour: number;
    reservationEndHour: number;
}

export type ServiceInput = Omit<Service, "_id"> & { _id?: MongoId };

const serviceSchema = new Schema({name: String, description: String, hasIoT: Boolean,
    IoTName: String, reservationDurationSeconds: Number,
    reservationStartHour: Number, reservationEndHour: Number});
export const ServiceModel = mongoose.model("Services"  as CollectionName, serviceSchema, "Services"  as CollectionName);
