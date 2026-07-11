import mongoose from "mongoose";

export interface IoTStatus {
    UUID: string;
    facilityID: string;
    inUse: boolean;
    outOfService: boolean;
}

const IoTStatusSchema = new mongoose.Schema({
    facilityID: {
        type: String,
        required: true
    },
    UUID: {
        type: String,
        required: true
    },
    inUse: {
        type: Boolean,
        required: true
    },
    outOfService: {
        type: Boolean,
        required: true
    }
})
export const IoTStatusModel = mongoose.model("IoTStatuses", IoTStatusSchema, "IoTStatuses");