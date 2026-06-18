import { Box } from "@mui/material";
import { useId } from "react";

type TransactionCardProps = {cardNumber: number, date: string, amount: number};

/**
 * React components for a Transaction (i.e. one entry in the Transaction
 * History card.)
 * 
 * @returns JSX for a Transaction.
 */
export function Transaction(props: TransactionCardProps) {
	const id = "transaction-" + useId();

	return (
		<Box id={id}>
			<div className="transaction-card-card-number">{props.cardNumber}</div>
			<div className="transaction-card-date">{props.date}</div>
			<div className="transaction-card-amount">{props.amount}</div>
		</Box>
	);
}