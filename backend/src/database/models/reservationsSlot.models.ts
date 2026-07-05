import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const ReservationSlotSchema = new Schema({_id: String, serviceId: String, booked: Boolean,
    bookedBy: String, startTime: Number, durationSeconds: Number});

const ReservationSlotModel = mongoose.model("reservation_slots"  as CollectionName, ReservationSlotSchema);
export default ReservationSlotModel;