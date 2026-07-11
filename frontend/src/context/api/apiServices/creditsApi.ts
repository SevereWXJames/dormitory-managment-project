// Scaffolding created by Claude
import { api } from "../api";
import type { CreditBalance, Transaction } from "@/dataTypes/creditBalance.ts";

export type AddCreditsRequestType = {userId: string, creditsCents: Number};

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
        putAddCredits: builder.mutation<Number, AddCreditsRequestType>({
            query: ({userId: userId, creditsCents: creditsCents}) => ({
                url: `/credits/add-credits/${encodeURIComponent(userId)}`,
                method: "PUT",
                body: {amount: creditsCents}
            })
        })
    }),
});

export const { useGetCreditBalanceQuery, useGetTransactionHistoryQuery, usePutAddCreditsMutation } = creditsApi;