import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../database/databaseConstants.ts";

export interface Notice {
    _id: string;
    createdBy: string;
    viewableBy: string[] | null;
    title: string;
    text: string;
    createAt: number;
}

const noticeSchema = new Schema({createdBy: String, viewableBy: Array,
    title: String, text: String, createAt: Number});
export const NoticeModel = mongoose.model("Notices"  as CollectionName, noticeSchema, "Notices"  as CollectionName);
