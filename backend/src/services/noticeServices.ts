import noticeJSON from "../../test_data/notices.json" with {type: "json"};
import type {Notice} from "../dataTypes/notice.ts";

export async function getAllNotices(): Promise<[Notice]> {
    return noticeJSON.notices as [Notice];
}

export async function getNoticesForUserId(id: string): Promise<[Notice]> {
    return noticeJSON.notices.filter((notice) => {
        return notice.viewableBy === null || notice.viewableBy.includes(id);
    }) as [Notice];
}