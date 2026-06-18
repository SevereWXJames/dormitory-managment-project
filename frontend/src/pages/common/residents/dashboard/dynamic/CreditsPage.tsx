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
        <CommonFrame commonFrameType={"RESIDENT"}/>
        <div className="creditsPage">
            <h1>Credits</h1>
            <h1>Credit Balance</h1>
            <CreditsBalanceCard />
            <h1>Add funds</h1>
            <AddCreditsCard />
            <h1>Transaction History</h1>
            <TransactionHistoryCard />
        </div>
    </>)
}