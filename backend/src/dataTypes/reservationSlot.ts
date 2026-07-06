import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.js";

export interface ReservationSlot {
    _id: string;
    serviceId: string;
    booked: boolean;
    bookedBy: string | null;
    startTime: number;
    durationSeconds: number;
}

const reservationSlotSchema = new Schema({_id: String, serviceId: String, booked: Boolean,
    bookedBy: String, startTime: Number, durationSeconds: Number});
export const ReservationSlotModel = mongoose.model("reservation_slots"  as CollectionName, reservationSlotSchema);
