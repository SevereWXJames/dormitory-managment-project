import {useGetResidentsQuery} from "@/context/api/apiServices/residentApi.ts";

export function useAdminResidentsData() {
    const getResidentsQuery = useGetResidentsQuery();
    return {
        loading: getResidentsQuery.isLoading,
        isError: getResidentsQuery.isError,
        error: getResidentsQuery.error?.message ?? null,
        residents: getResidentsQuery.data ?? [],
    };
}