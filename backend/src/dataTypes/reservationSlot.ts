import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface ReservationSlot {
    _id: mongoose.Types.ObjectId;
    serviceId: mongoose.Types.ObjectId;
    serviceName: string;
    booked: boolean;
    bookedBy: mongoose.Types.ObjectId | null;
    startTime: Date;
    durationSeconds: number;
}

export interface ReservationSlotTemplate {
    serviceId: mongoose.Types.ObjectId;
    serviceName: string;
    booked: boolean;
    startTime: Date;
    durationSeconds: number;
}

const reservationSlotSchema = new Schema({
    serviceId: mongoose.Types.ObjectId,
    booked: Boolean,
    serviceName: String,
    bookedBy: mongoose.Types.ObjectId, startTime: Date, durationSeconds: Number});
export const ReservationSlotModel = mongoose.model("ReservationSlots"  as CollectionName, reservationSlotSchema, "ReservationSlots"  as CollectionName);
