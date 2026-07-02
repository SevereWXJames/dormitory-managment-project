import { Button, Card, CardContent, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useDispatch } from "react-redux";
import { addCredits, addTransactionHistoryEntry } from "../../../context/residents/creditsSlice";
import { useState } from "react";
import { DateField } from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-ca';

/**
 * React components for the Add Credits display.
 * 
 * @returns JSX for the Add Credits Card
 */
export function AddCreditsCard() {
	const cardNumberID = "card-number";
	const expirationDateID = "expiration-date";
	const securityCodeID = "security-code";
	const nameID = "cardholder-name";
	const amountID = "amount";

	const dispatch = useDispatch();
	const [cardNumber, setCardNumber] = useState("");
	const [_expirationDate, setExpirationDate] = useState("");
	const [_securityCode, setsecurityCode] = useState("");
	const [_name, setName] = useState("");
	const [amount, setAmount] = useState("");

	/**
	 * TODO. For M2, no front-end validation is done: the provided amount is
	 * added to credits regardless of the value of other fields as long as the
	 * provided amount is a number.
	 * 
	 * Intended to handle card information validation, payment processing
	 * and amount adding.
	 */
	const processPayment = () => {
		const parsedAmount = parseFloat(amount);
		if (!Number.isNaN(parsedAmount)) {
			const amountCents = Math.round(parsedAmount * 100);

			dispatch(addCredits({amount: amountCents}));
			dispatch(addTransactionHistoryEntry({cardNumber, amount: amountCents}));
		}
	}

    const handleAmountInput = (e: React.InputEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        if (value === "" || Number(value) >= 0) {
            setAmount(value);
        }
        // if negative, simply don't update state — input visually reverts on next render
    };

	return (
		<Card id="add-credits-card" className="card flex flex-col">
			<CardContent id="add-credits-card-content">
				<FormControl sx={{m: 1, width: '100%', maxWidth: '25ch'}}>
					<InputLabel htmlFor={`${cardNumberID}-input`}>Card number</InputLabel>
					<OutlinedInput
						id={`${cardNumberID}-input`}
						type='number'
						label="Card number"
						onInput={(e) => setCardNumber((e.target as HTMLInputElement).value)}
					/>
				</FormControl>
				<FormControl sx={{m: 1, width: '100%', maxWidth: '25ch'}} variant="filled">
					<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-ca">
						<DateField
							id={`${expirationDateID}-input`}
							label="Expiration date"
							format="MM/YY"
							onChange={(value) => {
								const date = value?.toISOString();
								setExpirationDate((date == null) ? "" : date);
							}}
						/>
					</LocalizationProvider>
				</FormControl>
				<FormControl sx={{m: 1, width: '100%', maxWidth: '25ch'}}>
					<InputLabel htmlFor={`${securityCodeID}-input`}>Security code</InputLabel>
					<OutlinedInput
						id={`${securityCodeID}-input`}
						type='number'
						label="Security code"
						onInput={(e) => setsecurityCode((e.target as HTMLInputElement).value)}
					/>
				</FormControl>
				<FormControl sx={{m: 1, width: '100%', maxWidth: '25ch'}}>
					<InputLabel htmlFor={`${nameID}-input`}>Cardholder name</InputLabel>
					<OutlinedInput
						id={`${nameID}-input`}
						type='text'
						label="Cardholder name"
						onInput={(e) => setName((e.target as HTMLInputElement).value)}
					/>
				</FormControl>
				<FormControl sx={{m: 1, width: '100%', maxWidth: '25ch'}}>
					<InputLabel htmlFor={`${amountID}-input`}>Amount</InputLabel>
					<OutlinedInput
						id={`${amountID}-input`}
						type='number'
						label="Amount"
                        inputProps={{ min: 0 }}
                        onInput={handleAmountInput}
					/>
				</FormControl>
				<FormControl>
					<Button id="open-nav-bar-button" variant="contained" onClick={processPayment}>Pay</Button>
				</FormControl>
			</CardContent>
		</Card>
	);
}