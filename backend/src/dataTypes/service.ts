import { Schema } from "mongoose";
import database from "../database/database.ts";
import type { CollectionName } from "../database/databaseConstants.ts";

  export class Service {
    public _id: string;
    public name: string;
    public description: string;
    public hasIoT: boolean;
    public IoTName: string | null;
    public reservationDurationSeconds: number;
    public reservationStartHour: number;
    public reservationEndHour: number;

     public static model = database.mongoose.model("services" as CollectionName,
        new Schema({_id: String, name: String, description: String, hasIoT: Boolean,
          IoTName: String, reservationDurationSeconds: Number,
          reservationStartHour: Number, reservationEndHour: Number}));

    constructor({
                    _id,
                    name,
                    description,
                    hasIoT,
                    IoTName,
                    reservationDurationSeconds,
                    reservationStartHour,
                    reservationEndHour
                }:
                {
                    _id: string,
                    name: string,
                    description: string,
                    hasIoT: boolean,
                    IoTName: string | null,
                    reservationDurationSeconds: number,
                    reservationStartHour: number,
                    reservationEndHour: number
                }) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.hasIoT = hasIoT;
        this.IoTName = IoTName;
        this.reservationDurationSeconds = reservationDurationSeconds;
        this.reservationStartHour = reservationStartHour;
        this.reservationEndHour = reservationEndHour;
    }
}