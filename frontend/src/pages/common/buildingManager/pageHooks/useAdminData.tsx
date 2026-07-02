import {useSelector} from "react-redux";
import {getUserId} from "@/context/authenticationSlice.ts";
import {useGetUserByIdQuery} from "@/context/api/apiServices/userApi.ts";
import {useGetMaintenanceRequestsQuery} from "@/context/api/apiServices/maintenanceRequestApi.ts";
import {useGetNoticesQuery} from "@/context/api/apiServices/noticesApi.ts";

export function useAdminData() {
    const userId = useSelector(getUserId);
    const getUserQuery = useGetUserByIdQuery(userId!, { skip: !userId });
    const maintenanceRequestsQuery = useGetMaintenanceRequestsQuery();
    const noticesQuery = useGetNoticesQuery();

    return {
        loading: getUserQuery.isLoading || maintenanceRequestsQuery.isLoading || noticesQuery.isLoading,
        error: !userId ? "User is not authenticated."
            : getUserQuery.error?.message ??
            maintenanceRequestsQuery.error?.message ??
            noticesQuery.error?.message ?? null,
        managerData: getUserQuery.data,
        maintenanceRequests: maintenanceRequestsQuery.data,
        notices: noticesQuery.data
    };
}