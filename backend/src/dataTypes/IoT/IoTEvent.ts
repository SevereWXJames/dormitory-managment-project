import mongoose, {Schema, Types} from "mongoose";

export interface IoTEvent {
    _id: mongoose.Types.ObjectId;
    UUID: string;
    facilityID: mongoose.Types.ObjectId;
    type: string;
    data?: object;
 }

 const IoTEventSchema = new mongoose.Schema({
     facilityID: {
         type: mongoose.Types.ObjectId,
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