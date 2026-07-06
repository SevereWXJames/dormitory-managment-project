import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.js";

export interface Notice {
    _id: string;
    createdBy: string;
    viewableBy: string[] | null;
    title: string;
    text: string;
    createAt: number;
}

const noticeSchema = new Schema({_id: String, createdBy: String, viewableBy: Array,
    title: String, text: String, createAt: Number});
export const NoticeModel = mongoose.model("notice"  as CollectionName, noticeSchema);
