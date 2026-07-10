import { api } from "../api";
import {reservationSlotsApi} from "@/context/api/apiServices/reservationSlotsApi.ts";

type ServicesApiResponse = {
    success: boolean,
    data: ServicesApiResponseData[],
}

type ServicesApiResponseData = {
    _id: string,
    name: string,
    description: string,
    hasIoT: boolean,
    IoTUUID: string,
    IoTType: string,
    reservationDurationSeconds:number,
    reservationStartHour: number,
    reservationEndHour: number
}

export const servicesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query<ServicesApiResponse, void>({
            query: () => ({ url: `/services/`}),
            providesTags: ["IoTServices"],
        }),
    }),
});

export const {useGetBookingsQuery, useLazyGetBookingsQuery} = reservationSlotsApi;