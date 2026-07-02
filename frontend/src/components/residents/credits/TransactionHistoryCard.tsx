import { Card, CardContent } from "@mui/material";
import { useSelector } from "react-redux";
import { getTransactionHistory } from "../../../context/residents/creditsSlice";
import { Transaction } from "./Transaction";

/**
 * React components for the Transaction History display.
 * 
 * @returns JSX for the Transaction History card.
 */
export function TransactionHistoryCard() {
	const transactionHistory = useSelector(getTransactionHistory);
	const transactionCards = transactionHistory.map((t) =>
		<Transaction key={t._id} description={t.description} transaction={t.transaction} />);

	return (
		<Card id="transaction-history-card" className="card">
			<CardContent id="transaction-history-card-content">
				{transactionCards}
			</CardContent>
		</Card>
	);
}