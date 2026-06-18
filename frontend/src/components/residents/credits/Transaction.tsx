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
		<Box id={id} sx={{textAlign: "left"}}>
			<div className="transaction-card-card-number">Card: {props.cardNumber}</div>
			<div className="transaction-card-date">Date: {props.date}</div>
			<div className="transaction-card-amount">Amount: ${Number(props.amount).toFixed(2)}</div>
		</Box>
	);
}