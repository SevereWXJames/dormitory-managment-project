import noticeJSON from "../../test_data/notices.json" with {type: "json"};
import {Notice} from "../dataTypes/notice.ts";
import NoticeModel from "../database/models/noticeModel.ts";

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

export async function getNoticesForUserId(userId: string): Promise<Notice[]> {
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