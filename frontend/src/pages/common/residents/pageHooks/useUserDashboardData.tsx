import {useSelector} from "react-redux";
import {getUserId} from "@/context/authenticationSlice.ts";
import {useGetCreditBalanceQuery} from "@/context/api/apiServices/creditsApi.ts";
import {useGetUserBookingsQuery} from "@/context/api/apiServices/reservationsApi.ts";

export function useUserDashboardData() {
    const userId = useSelector(getUserId);
    const balanceQuery = useGetCreditBalanceQuery(userId!, { skip: !userId });
    const reservationQuery = useGetUserBookingsQuery(userId!, { skip: !userId });
    return {
        loading: balanceQuery.isLoading || reservationQuery.isLoading,
        isError: !userId || balanceQuery.isError || reservationQuery.isError,
        error: !userId
            ? "User is not authenticated."
            : balanceQuery.error?.message ??
            reservationQuery.error?.message ?? null,
        creditBalance: balanceQuery.data?? null,
        bookings: reservationQuery.data ?? []
    };
}