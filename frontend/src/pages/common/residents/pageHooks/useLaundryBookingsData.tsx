import {useSelector} from "react-redux";
import {getUserId} from "@/context/authenticationSlice.ts";
import {useGetBookingsQuery} from "@/context/api/apiServices/reservationSlotsApi.ts";
import {useGetCreditBalanceQuery} from "@/context/api/apiServices/creditsApi.ts";

export function useLaundryBookingsData() {
    const userId = useSelector(getUserId);
    const {data: balanceData} = useGetCreditBalanceQuery(userId!, { skip: !userId });
    const {data, isLoading, isError, error} = useGetBookingsQuery(userId!, { skip: !userId });
    return {
        isLoading: isLoading,
        isError: isError || !userId,
        error: !userId
            ? "User is not authenticated."
            : isError ? error?.message : null,
        bookings: data ?? [],
        balance: balanceData ? balanceData.balanceCents : 0
    };
}