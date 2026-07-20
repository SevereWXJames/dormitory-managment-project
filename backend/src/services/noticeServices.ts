import {type Notice, NoticeModel} from "../dataTypes/notice.ts";
import mongoose from "mongoose";

export async function getAllNotices(): Promise<Notice[]> {
    const cursor = NoticeModel.find({ }).lean();
    const results: Notice[] = [];

    for await (const result of cursor) {
        try {
            if (result != null) {
                results.push(result as Notice);
            }
        } catch (e) {
            // "Pass"
        }
    }

    return Promise.resolve(results);
}

export async function getNoticesForUserId(userId: mongoose.Types.ObjectId): Promise<Notice[]> {
    const cursor = NoticeModel.find({viewableBy: userId}).lean();
    const results: Notice[] = [];

    for await (const result of cursor) {
        try {
            if (result != null) {
                results.push(result as Notice);
            }
        } catch (e) {
            // "Pass"
        }
    }

    return Promise.resolve(results);
}