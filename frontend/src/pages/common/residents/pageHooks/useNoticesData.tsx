import {useSelector} from "react-redux";
import {getUserId} from "@/context/authenticationSlice.ts";
import {useGetNoticesByUserQuery} from "@/context/api/apiServices/noticesApi.ts";

export function useNoticesData() {
    const userId = useSelector(getUserId);
    const {data, isLoading, isError, error} = useGetNoticesByUserQuery(userId!, {skip: !userId});

    return {
        notices: data,
        isLoading,
        isError,
        error: !userId
            ? "User is not authenticated."
            : isError ? error?.message : null,
    };
}