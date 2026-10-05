import {useSelector} from "react-redux";
import {getUserId} from "@/context/authenticationSlice.ts";
import {
    useGetMaintenanceRequestsQuery,
    useGetRequestStatusesQuery, useGetRequestTypesQuery
} from "@/context/api/apiServices/maintenanceRequestApi.ts";


export function useAdminMaintenanceData() {
    const userId = useSelector(getUserId);
    const maintenanceRequestsQuery = useGetMaintenanceRequestsQuery();
    const requestsStatusQuery = useGetRequestStatusesQuery();
    const requestsTypeQuery = useGetRequestTypesQuery();

    return {
        loading: maintenanceRequestsQuery.isLoading ||
            requestsStatusQuery.isLoading || requestsTypeQuery.isLoading,
        error: !userId ? "User is not authenticated."
            : maintenanceRequestsQuery.error?.message ??
            requestsStatusQuery.error?.message ??
            requestsTypeQuery.error?.message ?? null,
        requests: maintenanceRequestsQuery.data ?? [],
        requestsStatus: requestsStatusQuery.data ?? [],
        requestsTypes: requestsTypeQuery.data ?? [],
    };
}