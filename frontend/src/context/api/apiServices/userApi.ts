import { api } from "../api";
import type {User} from "@/dataTypes/user.ts";

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserById: builder.query<User, string>({
            query: (userId) => ({ url: `/user/get-by-id/${encodeURIComponent(userId)}`}),
            providesTags: ["User"],
        }),
    }),
});

export const {useGetUserByIdQuery} = usersApi;