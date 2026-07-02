import {useSelector} from "react-redux";
import {getUserId} from "@/context/authenticationSlice.ts";
import {useGetBookingsQuery} from "@/context/api/apiServices/reservationSlotsApi.ts";

export function useLaundryBookingsData() {
    const userId = useSelector(getUserId);
    const {data, isLoading, isError, error} = useGetBookingsQuery(userId!, { skip: !userId });
    return {
        isLoading: isLoading,
        isError: isError || !userId,
        error: !userId
            ? "User is not authenticated."
            : isError ? error?.message : null,
        bookings: data ?? [],
    };
}