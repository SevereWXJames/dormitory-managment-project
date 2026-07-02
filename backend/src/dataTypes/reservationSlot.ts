import { Schema } from "mongoose";
import database from "../database/database.ts";
import type { CollectionName } from "../database/databaseConstants.ts";

export class ReservationSlot {
    public _id: string;
    public serviceId: string;
    public booked: boolean;
    public bookedBy: string | null;
    public startTime: number;
    public durationSeconds: number;
    public static model = database.mongoose.model("reservation_slots" as CollectionName,
        new Schema({_id: String, serviceId: String, booked: Boolean,
            bookedBy: String, startTime: Number, durationSeconds: Number}));

    constructor({_id, serviceId, booked, bookedBy, time, durationSeconds}: {_id: string, serviceId: string, booked: boolean, bookedBy: string | null, time: number, durationSeconds: number}) {
        this._id = _id;
        this.serviceId = serviceId;
        this.booked = booked;
        this.bookedBy = bookedBy;
        this.startTime = time;
        this.durationSeconds = durationSeconds;
    }
}