// Scaffolding created by Claude
import { api } from "../api";
import type { CreditBalance, Transaction } from "@/dataTypes/creditBalance.ts";

export const creditsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCreditBalance: builder.query<CreditBalance, string>({
            query: (userId) => ({ url: `/credits/get-for-user/${encodeURIComponent(userId)}` }),
            providesTags: ["Credits"],
        }),
        getTransactionHistory: builder.query<Transaction[], string>({
            query: (userId) => ({ url: `/credits/get-transaction-history/${encodeURIComponent(userId)}` }),
            providesTags: ["Transactions"],
        }),
    }),
});

export const { useGetCreditBalanceQuery, useGetTransactionHistoryQuery } = creditsApi;