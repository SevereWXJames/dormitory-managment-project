import {api} from "../api";
type IoTStatusAPIResponse = {
    _id: string,
    facilityID: string,
    facilityName: string,
    UUID: string,
    inUse: boolean,
    outOfService: boolean
}

type IoTStatusArgs = {
    iotUUID: string
}
export const iotStatusApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getIotStatusByUUID: builder.query<IoTStatusAPIResponse, IoTStatusArgs>({
            query: (statusArgs) => ({
                url: `/IoT/get-status-by-service-uuid/${statusArgs.iotUUID}`,
            }),
            providesTags: ["IoTStatus"],
        }),
    }),
});

export const {useGetIotStatusByUUIDQuery} = iotStatusApi;