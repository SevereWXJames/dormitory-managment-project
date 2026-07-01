import { Card, CardContent } from "@mui/material";
import { useSelector } from "react-redux";
import { getTransactionHistory } from "../../../context/residents/creditsSlice";
import {TransactionHistoryTable} from "@/components/residents/credits/TransactionHistoryTable.tsx";

/**
 * React components for the Transaction History display.
 * 
 * @returns JSX for the Transaction History card.
 */
export function TransactionHistoryCard() {
	const transactionHistory = useSelector(getTransactionHistory);
	// const transactionCards = transactionHistory.map((t) =>
	// 	<Transaction key={t.id} cardNumber={t.cardNumber} date={t.date} amount={t.amount} />);

	return (
		<Card id="transaction-history-card" className="card">
			<CardContent id="transaction-history-card-content">
				<TransactionHistoryTable rows={transactionHistory}/>
			</CardContent>
		</Card>
	);
}