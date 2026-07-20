import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface ReservationSlot {
    serviceId: string;
    serviceName: string;
    booked: boolean;
    bookedBy: string | null;
    startTime: number;
    durationSeconds: number;
}

const reservationSlotSchema = new Schema({
    serviceId: String,
    booked: Boolean,
    serviceName: String,
    bookedBy: String, startTime: Number, durationSeconds: Number});
export const ReservationSlotModel = mongoose.model("ReservationSlots"  as CollectionName, reservationSlotSchema, "ReservationSlots"  as CollectionName);
