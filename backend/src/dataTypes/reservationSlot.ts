import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface ReservationSlot {
    _id: string;
    serviceId: string;
    booked: boolean;
    bookedBy: string | null;
    startTime: number;
    durationSeconds: number;
}

const reservationSlotSchema = new Schema({serviceId: String, booked: Boolean,
    bookedBy: String, startTime: Number, durationSeconds: Number});
export const ReservationSlotModel = mongoose.model("ReservationSlots"  as CollectionName, reservationSlotSchema, "ReservationSlots"  as CollectionName);
