import { api } from "../api";
import type {Notice} from "@/dataTypes/notice.ts";

export const noticesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getNoticesByUser: builder.query<Notice[], string>({
            query: (userId) => ({ url: `/notices/get-for-user/${encodeURIComponent(userId)}`}),
            providesTags: ["Notices"],
        }),

        getNotices: builder.query<Notice[], void>({
            query: () => ({ url: `/notices/`}),
            providesTags: ["Notices"],
        }),
    }),
});

export const {useGetNoticesByUserQuery, useGetNoticesQuery} = noticesApi;