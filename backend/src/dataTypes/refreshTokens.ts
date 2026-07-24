import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface RefreshToken {
    _id: mongoose.Types.ObjectId;
    userId: string;
    refreshToken: string;
}

const refreshTokenSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true
    }
});
export const RefreshTokenModel = mongoose.model("RefreshTokens"  as CollectionName, refreshTokenSchema, "RefreshTokens"  as CollectionName);
