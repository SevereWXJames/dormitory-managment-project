import { Box } from "@mui/material";
import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import { AddCreditsCard } from "../../../../../components/residents/credits/AddCreditsCard.tsx";
import { CreditsBalanceCard } from "../../../../../components/residents/credits/CreditsBalanceCard.tsx";
import { TransactionHistoryCard } from "../../../../../components/residents/credits/TransactionHistoryCard.tsx";

export interface CreditsPageProps {
    credit_balance: number,
    transactions: object[]
}

export function CreditsPage() {
    return (<>
        <CommonFrame commonFrameType={"RESIDENT"}>
        <div className="credits-page">
            <h1>Credits</h1>
            <Box className="cards-row flex flex-col lg:flex-row items-center gap-4">
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
        </div>
        </CommonFrame>
    </>)
}