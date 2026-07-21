import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface RefreshToken {
    _id: mongoose.Types.ObjectId;
    userId: string;
    refreshToken: string;
}

const noticeSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true
    }
});
export const RefreshTokenModel = mongoose.model("RefreshTokens"  as CollectionName, noticeSchema, "RefreshTokens"  as CollectionName);
