import {useDispatch} from "react-redux";
import {useState} from "react";
import {addCredits, addTransactionHistoryEntry} from "@/context/residents/creditsSlice.ts";

export function useAddCreditsCard() {
    const dispatch = useDispatch();
    const [cardNumber, setCardNumber] = useState("");
    const [_expirationDate, setExpirationDate] = useState("");
    const [_securityCode, setSecurityCode] = useState("");
    const [_name, setName] = useState("");
    const [amount, setAmount] = useState("");

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

    return {processPayment, handleAmountInput,
    cardNumber, setCardNumber,
    setExpirationDate, setSecurityCode, setName, amount, setAmount}

}