import { api } from "../api";

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
        getServices: builder.query<ServicesApiResponseData[], void>({
            query: () => ({ url: `/services/`}),
            providesTags: ["IoTServices"],
        }),
    }),
});

export const {useGetServicesQuery} = servicesApi;