import { api } from "../api";
import type {MaintenanceRequest} from "@/dataTypes/maintenanceRequest.ts";
import type {MaintenanceRequestState} from "@/types/residents/types.ts";

//Helper to convert api response into appropriate type
function parseRequest(request: MaintenanceRequest): MaintenanceRequestState {
    const requestType = request.priority?.toUpperCase() === "HIGH" || request.priority?.toUpperCase() === "MEDIUM" || request.priority?.toUpperCase() === "LOW"
        ? request.priority.toUpperCase() as "HIGH" | "MEDIUM" | "LOW"
        : "LOW";
    const requestStatus = request.status?.toLowerCase() === "completed" ? "RESOLVED" : request.status?.toLowerCase() === "inprogress" ? "SCHEDULED" : "NEW";

    return({
        id: request._id,
        unit: request.location ?? "N/A",
        priority: requestType,
        status: requestStatus,
        issue: request.title,
        location: request.location ?? "N/A",
        description: request.description})
}

export const maintenanceRequestApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getMaintenanceRequestByUser: builder.query<MaintenanceRequestState[], string>({
            query: (userId) => ({ url: `/maintenance-request/get-for-user/${encodeURIComponent(userId)}`}),
            transformResponse: (requests : MaintenanceRequest[]) => requests.map(parseRequest),
            providesTags: ["MaintenanceRequests"],
        }),

        getMaintenanceRequests: builder.query<MaintenanceRequestState[], void>({
            query: () => ({ url: `/maintenance-request/`}),
            transformResponse: (requests : MaintenanceRequest[]) => requests.map(parseRequest),
            providesTags: ["MaintenanceRequests"],
        }),
    }),
});

export const {useGetMaintenanceRequestByUserQuery, useGetMaintenanceRequestsQuery} = maintenanceRequestApi;