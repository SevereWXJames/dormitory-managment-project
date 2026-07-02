import { Box } from "@mui/material";
import { useId } from "react";

type TransactionCardProps = {description: string, transaction: number};

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
			<div className="transaction-card-description">Description: {props.description}</div>
			<div className="transaction-card-amount">Amount: ${Number(props.transaction / 100).toFixed(2)}</div>
		</Box>
	);
}