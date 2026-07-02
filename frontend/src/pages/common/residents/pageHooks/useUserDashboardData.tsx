import {useSelector} from "react-redux";
import {getUserId} from "@/context/authenticationSlice.ts";
import {useGetCreditBalanceQuery} from "@/context/api/apiServices/creditsApi.ts";
import {useGetNoticesByUserQuery} from "@/context/api/apiServices/noticesApi.ts";
import {useGetUserBookingsQuery} from "@/context/api/apiServices/reservationsApi.ts";

export function useUserDashboardData() {
    const userId = useSelector(getUserId);
    const balanceQuery = useGetCreditBalanceQuery(userId!, { skip: !userId });
    const reservationQuery = useGetUserBookingsQuery(userId!, { skip: !userId });
    const noticesQuery = useGetNoticesByUserQuery(userId!, { skip: !userId });
    return {
        loading: balanceQuery.isLoading || noticesQuery.isLoading || reservationQuery.isLoading,
        isError: !userId || balanceQuery.isError || noticesQuery.isError || reservationQuery.isError,
        error: !userId
            ? "User is not authenticated."
            : balanceQuery.error?.message ??
            noticesQuery.error?.message ??
            reservationQuery.error?.message ?? null,
        creditBalance: balanceQuery.data?? null,
        notices: noticesQuery.data ?? [],
        bookings: reservationQuery.data ?? []
    };
}