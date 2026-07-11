import mongoose, {Schema} from "mongoose";

export interface IoTEvent {
    UUID: string;
    facilityID: string;
    type: string;
    data?: object;
 }

 const IoTEventSchema = new mongoose.Schema({
     facilityID: {
         type: String,
         required: true
     },
     UUID: {
         type: String,
         required: true
     },
     type: {
         type: String,
         required: true
     },
     data: {
         type: Schema.Types.Mixed,
         required: false
     }
 }, {timestamps: true})
 export const IoTEventModel = mongoose.model("IoTEvents", IoTEventSchema, "IoTEvents");