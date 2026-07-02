import { Box } from "@mui/material";
import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import { AddCreditsCard } from "../../../../../components/residents/credits/AddCreditsCard.tsx";
import { CreditsBalanceCard } from "../../../../../components/residents/credits/CreditsBalanceCard.tsx";
import { TransactionHistoryCard } from "../../../../../components/residents/credits/TransactionHistoryCard.tsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../../../context/authenticationSlice.ts";
import { fetchJson } from "../../../../../utils/api.ts";
import { setCredits, setTransactionHistory } from "../../../../../context/residents/creditsSlice.ts";
import type { CreditBalance, Transaction } from "../../../../../dataTypes/creditBalance.ts";

export interface CreditsPageProps {
    credit_balance: number,
    transactions: object[]
}

export function CreditsPage() {
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCreditsData = async () => {
            if (!userId) {
                setError("User is not authenticated.");
                setLoading(false);
                return;
            }

            try {
                const [balance, transactions] = await Promise.all([
                    fetchJson<CreditBalance>(`/credits/get-for-user/${encodeURIComponent(userId)}`),
                    fetchJson<Transaction[]>(`/credits/get-transaction-history/${encodeURIComponent(userId)}`),
                ]);

                dispatch(setCredits(balance.balanceCents));
                dispatch(setTransactionHistory(transactions));
            } catch (fetchError) {
                setError(fetchError instanceof Error ? fetchError.message : "Unable to load credits data.");
            } finally {
                setLoading(false);
            }
        };

        loadCreditsData();
    }, [userId, dispatch]);

    return (<>
        <CommonFrame commonFrameType={"RESIDENT"}/>
        <div className="credits-page">
            <h1>Credits</h1>
            {loading && <p>Loading credits data...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
                <>
                    <Box className="cards-row">
                        <Box className="card-container">
                            <h2>Credit Balance</h2>
                            <CreditsBalanceCard />
                        </Box>
                        <Box className="card-container">
                            <h2>Add funds</h2>
                            <AddCreditsCard />
                        </Box>
                    </Box>
                    <Box className="card-container">
                        <h2>Transaction History</h2>
                        <TransactionHistoryCard />
                    </Box>
                </>
            )}
        </div>
    </>)
}
