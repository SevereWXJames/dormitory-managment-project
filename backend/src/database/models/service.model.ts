import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const serviceSchema = new Schema({_id: String, name: String, description: String, hasIoT: Boolean,
    IoTName: String, reservationDurationSeconds: Number,
    reservationStartHour: Number, reservationEndHour: Number});

const ServiceModel = mongoose.model("services"  as CollectionName, serviceSchema);
export default ServiceModel;