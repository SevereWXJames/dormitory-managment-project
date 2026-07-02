// Scaffolding created by Claude
import type {Resident} from "@/dataTypes/user.ts";
import {api} from "@/context/api/api.ts";

export const residentApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getResidents: builder.query<Resident[], void>({
            query: () => ({ url: `/residents/` }),
            providesTags: ["Residents"],
        }),
    }),
});

export const { useGetResidentsQuery } = residentApi;