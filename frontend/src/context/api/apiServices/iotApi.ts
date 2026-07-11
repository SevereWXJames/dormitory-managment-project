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
            query: (uuid) => ({
                url: `/IoT/get-status-by-service-uuid/`,
                body: {iotUUID: uuid},
            }),
            providesTags: ["IoTStatus"],
        }),
    }),
});

export const {useGetIotStatusByUUIDQuery} = iotStatusApi;