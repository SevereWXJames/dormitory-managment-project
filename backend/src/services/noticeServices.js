import noticeJSON from "../../test_data/notices.json" with { type: "json" };
export async function getAllNotices() {
    return noticeJSON.notices;
}
export async function getNoticesForUserId(id) {
    return noticeJSON.notices.filter((notice) => {
        return notice.viewableBy === null || notice.viewableBy.includes(id);
    });
}
//# sourceMappingURL=noticeServices.js.map