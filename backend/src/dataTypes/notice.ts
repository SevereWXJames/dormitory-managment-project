import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface Notice {
    _id: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    viewableBy: mongoose.Types.ObjectId[] | null;
    title: string;
    text: string;
    createAt: number;
}

const noticeSchema = new Schema({createdBy: mongoose.Types.ObjectId, viewableBy: [mongoose.Types.ObjectId],
    title: String, text: String, createAt: Number});
export const NoticeModel = mongoose.model("Notices"  as CollectionName, noticeSchema, "Notices"  as CollectionName);
