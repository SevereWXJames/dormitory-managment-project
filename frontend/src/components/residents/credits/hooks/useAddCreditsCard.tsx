import {usePutAddCreditsMutation, type AddCreditsRequestType} from "@/context/api/apiServices/creditsApi";
import {getUserId} from "@/context/authenticationSlice";
import {addCredits, addTransactionHistoryEntry} from "@/context/residents/creditsSlice";
import {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

/**
 * Hook that stores the local state of the "Add Credits" card,
 * and makes and handles the API call to add credits.
 * @returns All local React state variables, their set functions, and the
 * handleAddCredits and handleAddTransactionHistoryEntry function.
 */
export function useAddCreditsCard() {
    const dispatch = useDispatch();

    // States
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [successSnackbar, setSuccessSnackbar] = useState(false); // Visibility state of the “Added credits successfully" snackbar
    const [failureSnackbar, setFailureSnackbar] = useState(false); // Visibility of the "Error while adding credits" snackbar
    const [errorMessage, setErrorMessage] = useState("");

    // Redux
    const userId = useSelector(getUserId);
    const [putAddCredits] = usePutAddCreditsMutation();

    // Errors
    const cardNumberError = useMemo(() => cardNumber.length !== 16 && cardNumber.length > 0 && !isNaN(Number(cardNumber)), [cardNumber]);
    const expirationDateError = useMemo(() => (expirationDate.length < 4 && expirationDate.length > 0) || new Date(expirationDate) < new Date(), [expirationDate]);
    const securityCodeError = useMemo(() => securityCode.length < 3 && securityCode.length > 0, [securityCode]);
    const amountError = useMemo(() => false, [amount]); // No longer needed
    
    const emptyCardNumberError = useMemo(() => cardNumber.length == 0, [cardNumber]);
    const emptyExpirationDateError = useMemo(() => expirationDate.length == 0, [expirationDate]);
    const emptySecurityCodeError = useMemo(() => securityCode.length == 0, [securityCode]);
    const emptyAmountError = useMemo(() => amount.length == 0, [amount]);
    
    const errors = [cardNumberError, expirationDateError, securityCodeError, amountError, emptyCardNumberError,
        emptyExpirationDateError, emptySecurityCodeError, emptyAmountError];
    const errorMessages = ["Invalid card number.", "Invalid expiration date.", "Invalid security code.",
        "Invalid amount.", "Please input a card number.", "Please input an expiration date.",
        "Please input a security code.", "Please input an amount."];
    
    // errors.some((e) => e) returns true if there is any element in the errors away that is true.
    const formError = useMemo(() => errors.some((e) => e), [errors]);
    
    const handleAddCredits = async () => {
        const parsedAmount = parseFloat(amount);
        setErrorMessage("");

        if (formError) {
            const errorIndex = errors.findIndex((e) => e);
            setErrorMessage(errorMessages[errorIndex]);
            return;
        }
        
        if (!Number.isNaN(parsedAmount)) {
            const amountCents = Math.round(parsedAmount * 100);

            try {
                await putAddCredits({userId: userId, creditsCents: amountCents} as AddCreditsRequestType).unwrap();
                dispatch(addCredits({amount: amountCents}));
                dispatch(addTransactionHistoryEntry({cardNumber, amount: amountCents}));

                setCardNumber("");
                // setExpirationDate("");
                setSecurityCode("");
                setName("");
                setAmount("");

                // Clear expiration date
                (document.getElementById("expiration-date-input") as HTMLInputElement).value = "";
                
                setSuccessSnackbar(true);
                setFailureSnackbar(false);
            } catch (e) {
                setSuccessSnackbar(false);
                setFailureSnackbar(false);
            }
        }
    }

    const handleAmountInput = (e: React.InputEvent<HTMLInputElement>) => {
        const value = (e.target as HTMLInputElement).value;
        if (value === "" || Number(value) >= 0) {
            setAmount(value);
        }
        // if negative, simply don't update state — input visually reverts on next render
    };

    const handleCloseSuccessSnackbar = () => {
        setSuccessSnackbar(false);
    }

    const handleCloseFailureSnackbar = () => {
        setFailureSnackbar(false);
    }

    return {
        cardNumber, setCardNumber,
        expirationDate, setExpirationDate,
        securityCode, setSecurityCode,
        name, setName,
        amount, setAmount,
        handleAddCredits,
        handleAmountInput,
        cardNumberError,
        expirationDateError,
        securityCodeError,
        amountError,
        formError,
        successSnackbar,
        handleCloseSuccessSnackbar,
        failureSnackbar,
        handleCloseFailureSnackbar,
        errorMessage
    }
}