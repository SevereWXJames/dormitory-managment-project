import {useSelector} from "react-redux";
import {getUserId} from "@/context/authenticationSlice.ts";
import {useGetUserByIdQuery} from "@/context/api/apiServices/userApi.ts";
import {useGetMaintenanceRequestsQuery} from "@/context/api/apiServices/maintenanceRequestApi.ts";
// notices removed from admin dashboard; no import

export function useAdminData() {
    const userId = useSelector(getUserId);
    const getUserQuery = useGetUserByIdQuery(userId!, { skip: !userId });
    const maintenanceRequestsQuery = useGetMaintenanceRequestsQuery();
    return {
        loading: getUserQuery.isLoading || maintenanceRequestsQuery.isLoading,
        error: !userId ? "User is not authenticated."
            : getUserQuery.error?.message ??
            maintenanceRequestsQuery.error?.message ?? null,
        managerData: getUserQuery.data,
        maintenanceRequests: maintenanceRequestsQuery.data,
    };
}