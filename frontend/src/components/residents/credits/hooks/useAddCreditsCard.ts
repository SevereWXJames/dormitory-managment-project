import { usePutAddCreditsMutation, type AddCreditsRequestType } from "@/context/api/apiServices/creditsApi";
import { getUserId } from "@/context/authenticationSlice";
import { addCredits, addTransactionHistoryEntry } from "@/context/residents/creditsSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * Hook that stores the local state of the "Add Credits" card,
 * and makes and handles the API call to add credits.
 * @returns All local React state variables, their set functions, and the
 * handleAddCredits and handleAddTransactionHistoryEntry function.
 */
export function useAddCreditsCard() {
	const dispatch = useDispatch();
	const userId = useSelector(getUserId);
	const [cardNumber, setCardNumber] = useState("");
	const [_expirationDate, setExpirationDate] = useState("");
	const [_securityCode, setsecurityCode] = useState("");
	const [_name, setName] = useState("");
	const [amount, setAmount] = useState("");
	const [putAddCredits] = usePutAddCreditsMutation();

	const handleAddCredits = async () => {
		const parsedAmount = parseFloat(amount);
		if (!Number.isNaN(parsedAmount)) {
			const amountCents = Math.round(parsedAmount * 100);

			dispatch(addCredits({amount: amountCents}));
			dispatch(addTransactionHistoryEntry({cardNumber, amount: amountCents}));
			await putAddCredits({userId: userId, creditsCents: amountCents} as AddCreditsRequestType);
		}
	}

	return {
		cardNumber, setCardNumber,
		_expirationDate, setExpirationDate,
		_securityCode, setsecurityCode, 
		_name, setName,
		amount, setAmount,
		handleAddCredits
	}
}