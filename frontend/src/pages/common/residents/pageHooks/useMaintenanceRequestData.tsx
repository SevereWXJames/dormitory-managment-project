import {useSelector} from "react-redux";
import {getUserId} from "@/context/authenticationSlice.ts";
import {useGetMaintenanceRequestByUserQuery} from "@/context/api/apiServices/maintenanceRequestApi.ts";

export function useMaintenanceRequestData() {
    const userId = useSelector(getUserId);
    const {data, isLoading, isError, error} = useGetMaintenanceRequestByUserQuery(userId!, { skip: !userId });
    return {
        isLoading: isLoading,
        isError: isError || !userId,
        error: !userId
            ? "User is not authenticated."
            : isError ? error?.message : null,
        requests: data ?? [],
    };
}