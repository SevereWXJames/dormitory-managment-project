import mongoose from "mongoose";

export interface IoTStatus {
    UUID: string;
    facilityID: string;
    facilityName?: string;
    inUse: boolean;
    outOfService: boolean;

}

const IoTStatusSchema = new mongoose.Schema({
    facilityID: {
        type: String,
        required: true
    },

    facilityName: {
        type: String,
        required: false,
        default: null,
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