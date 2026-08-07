import {Button, Card, CardContent, FormControl, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField} from "@mui/material";
import {DateField} from '@mui/x-date-pickers/DateField';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-ca';

import {useAddCreditsCard} from "@/components/residents/credits/hooks/useAddCreditsCard.tsx";


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

    const {
        cardNumber, setCardNumber,
        setExpirationDate,
        securityCode, setSecurityCode,
        name, setName,
        amount,
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
    } = useAddCreditsCard();

    /**
     * TODO. For M2, no front-end validation is done: the provided amount is
     * added to credits regardless of the value of other fields as long as the
     * provided amount is a number.
     *
     * Intended to handle card information validation, payment processing
     * and amount adding.
     */

    return (
        <Card id="add-credits-card" className="card flex flex-col">
            <CardContent id="add-credits-card-content">
                <FormControl sx={{m: 1, width: '100%', maxWidth: '25ch'}}>
                    <TextField
                        id={`${cardNumberID}-input`}
                        variant="outlined"
                        type='text'
                        inputMode="numeric"
                        label="Card number"
                        error={cardNumberError}
                        slotProps={{ htmlInput: { maxLength: 16 } }}
                        helperText={cardNumberError ? "Invalid card number" : ""}
                        onInput={(e) => setCardNumber((e.target as HTMLInputElement).value)}
                        value={cardNumber}
                    />
                </FormControl>
                <FormControl sx={{m: 1, width: '100%', maxWidth: '25ch'}} variant="filled">
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-ca">
                        <DateField
                            id={`${expirationDateID}-input`}
                            label="Expiration date"
                            format="MM/YY"
                            error={expirationDateError}
                            helperText={expirationDateError ? "Invalid expiration date" : ""}
                            onChange={(value) => {
                                const date = value?.toISOString();
                                setExpirationDate((date == null) ? "" : date);
                            }}
                        />
                    </LocalizationProvider>
                </FormControl>
                <FormControl sx={{m: 1, width: '100%', maxWidth: '25ch'}}>
                    <TextField
                        id={`${securityCodeID}-input`}
                        variant="outlined"
                        type='text'
                        inputMode="numeric"
                        label="Security code"
                        error={securityCodeError}
                        slotProps={{ htmlInput: { maxLength: 4 } }}
                        helperText={securityCodeError ? "Invalid security code" : ""}
                        onInput={(e) => setSecurityCode((e.target as HTMLInputElement).value)}
                        value={securityCode}
                    />
                </FormControl>
                <FormControl sx={{m: 1, width: '100%', maxWidth: '25ch'}}>
                    <InputLabel htmlFor={`${nameID}-input`}>Cardholder name</InputLabel>
                    <OutlinedInput
                        id={`${nameID}-input`}
                        type='text'
                        label="Cardholder name"
                        onInput={(e) => setName((e.target as HTMLInputElement).value)}
                        value={name}
                    />
                </FormControl>
                <FormControl sx={{m: 1, width: '100%', maxWidth: '25ch'}}>
                    <InputLabel htmlFor={`${amountID}-input`}>Amount</InputLabel>
                    <OutlinedInput
                        id={`${amountID}-input`}
                        type='number'
                        label="Amount"
                        inputProps={{min: 0}}
                        error={amountError}
                        onInput={handleAmountInput}
                        value={amount}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
                <FormControl>
                    <Button
                        id="open-nav-bar-button"
                        variant="contained"
                        disabled={formError}
                        onClick={handleAddCredits}>Pay</Button>
                </FormControl>
                {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
                
                <Snackbar 
                    open={successSnackbar}
                    onClose={handleCloseSuccessSnackbar}
                    autoHideDuration={5000}
                    message="Added credit successfully."
                />
                <Snackbar 
                    open={failureSnackbar}
                    onClose={handleCloseFailureSnackbar}
                    autoHideDuration={5000}
                    message="Error while adding credit. Please try again."
                />
            </CardContent>
        </Card>
    );
}