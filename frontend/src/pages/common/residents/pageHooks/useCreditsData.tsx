// hooks/useCreditsData.ts
import {useSelector} from "react-redux";
import {useGetCreditBalanceQuery, useGetTransactionHistoryQuery} from "@/context/api/services/creditsApi.ts";
import {getUserId} from "@/context/authenticationSlice.ts";

export function useCreditsData() {
    const userId = useSelector(getUserId);
    const balanceQuery = useGetCreditBalanceQuery(userId!, { skip: !userId });
    const transactionsQuery = useGetTransactionHistoryQuery(userId!, { skip: !userId });

    return {
        loading: balanceQuery.isLoading || transactionsQuery.isLoading,
        error: !userId
            ? "User is not authenticated."
            : balanceQuery.error?.message ?? transactionsQuery.error?.message ?? null,
        balanceCents: balanceQuery.data?.balanceCents,
        transactions: transactionsQuery.data,
    };
}