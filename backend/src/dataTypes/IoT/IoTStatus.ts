import mongoose from "mongoose";

export interface IoTStatus {
    _id: mongoose.Types.ObjectId;
    UUID: string;
    facilityID: mongoose.Types.ObjectId;
    facilityName?: string;
    inUse: boolean;
    outOfService: boolean;

}

const IoTStatusSchema = new mongoose.Schema({
    facilityID: {
        type: mongoose.Types.ObjectId,
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