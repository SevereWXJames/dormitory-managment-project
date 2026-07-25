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
    const [_expirationDate, setExpirationDate] = useState("");
    const [_securityCode, setSecurityCode] = useState("");
    const [_name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [successSnackbar, setSuccessSnackbar] = useState(false); // Visibility state of the “Added credits successfully" snackbar
    const [failureSnackbar, setFailureSnackbar] = useState(false); // Visibility of the "Error while adding credits" snackbar

    // Redux
    const userId = useSelector(getUserId);
    const [putAddCredits] = usePutAddCreditsMutation();

    // Errors
    const cardNumberError = useMemo(() => cardNumber.length !== 16 && cardNumber.length > 0 && !isNaN(Number(cardNumber)), [cardNumber]);
    const expirationDateError = useMemo(() => _expirationDate.length < 4 && _expirationDate.length > 0, [_expirationDate]);
    const securityCodeError = useMemo(() => _securityCode.length < 3 && _securityCode.length > 0, [_securityCode]);
    const amountError = useMemo(() => amount.length == 0, [amount]);
    const formError = useMemo(() => cardNumberError || expirationDateError || securityCodeError || amountError, [cardNumberError, expirationDateError, securityCodeError, amountError]);

    const handleAddCredits = async () => {
        const parsedAmount = parseFloat(amount);
        if (!Number.isNaN(parsedAmount)) {
            const amountCents = Math.round(parsedAmount * 100);

            try {
                await putAddCredits({userId: userId, creditsCents: amountCents} as AddCreditsRequestType).unwrap();
                dispatch(addCredits({amount: amountCents}));
                dispatch(addTransactionHistoryEntry({cardNumber, amount: amountCents}));
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
        _expirationDate, setExpirationDate,
        _securityCode, setSecurityCode,
        _name, setName,
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
        handleCloseFailureSnackbar
    }
}