import noticeJSON from "../../test_data/notices.json" with {type: "json"};
import {Notice} from "../dataTypes/notice.ts";

export async function getAllNotices(): Promise<Notice[]> {
    const cursor = Notice.model.find({ }).lean();
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
    const cursor = Notice.model.find({viewableBy: userId}).lean();
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