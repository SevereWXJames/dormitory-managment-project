import mongoose, {Schema} from "mongoose";
import type {CollectionName} from "../databaseConstants.ts";

const noticeSchema = new Schema({_id: String, createdBy: String, viewableBy: Array,
    title: String, text: String, createAt: Number});

const NoticeModel = mongoose.model("notice"  as CollectionName, noticeSchema);
export default NoticeModel;