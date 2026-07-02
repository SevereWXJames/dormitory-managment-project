import noticeJSON from "../../test_data/notices.json" with {type: "json"};
import type {Notice} from "../dataTypes/notice.ts";

export async function getAllNotices(): Promise<[Notice]> {
    return noticeJSON.notices as [Notice];
}

export async function getNoticesForUserId(id: string): Promise<[Notice]> {
    return noticeJSON.notices.filter((notice) => {
        if (notice.viewableBy === null) {
            return true;
        }

        const visibleUserIds = (Array.isArray(notice.viewableBy) ? notice.viewableBy : [notice.viewableBy])
            .flatMap((entry) => entry.split(",").map((item) => item.trim()).filter(Boolean));

        return visibleUserIds.includes(id);
    }) as [Notice];
}