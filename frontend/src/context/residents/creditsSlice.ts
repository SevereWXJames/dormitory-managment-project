import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store.ts';

/**
 * State for the creditsSlice.
 * @property credits {number} Credits represented as a number of cents.
 */
type CreditsSliceState = {
	credits: number
	transactionHistory: {
		id: number,
		cardNumber: number,
		date: string,
		amount: number
	}[];
};

const initialState: CreditsSliceState = {
	credits: 0,
	transactionHistory: []
};

/**
 * Redux slice for the user's credits.
 */
export const creditsSlice = createSlice({
	name: 'credits',
	initialState,
	reducers: {
		addCredits: (state, parameters) => {
			state.credits += parameters.payload.amount;
		},
		addTransactionHistoryEntry: (state, parameters) => {
			const id = state.transactionHistory.length + 1;
			const cardNumber = parameters.payload.cardNumber;
			const date = new Date(Date.now()).toISOString();
			const amount = parameters.payload.amount;

			state.transactionHistory.push({id, cardNumber, date, amount});
		}
	}
});

export const { addCredits, addTransactionHistoryEntry } = creditsSlice.actions;

/**
 *  Returns the amount of credits as a number of cents.
 * 
 * @param state {CreditsSliceState} State for the creditsSlice.
 * @returns Amount of credits as a number of cents.
 */
export const getCreditsCents = (state: RootState) => {
	return state.credits.credits;
}

/**
 * Returns the amount of credits formatted as a string.
 * 
 * @param state {CreditsSliceState} State for the creditsSlice.
 * @returns Amount of credits as a formatted string with two decimal digits.
 */
export const getCreditsString = (state: RootState) => {
	return `$${(state.credits.credits / 100).toFixed(2)}`;
}

export const getTransactionHistory = (state: RootState) => {
	return state.credits.transactionHistory;
}

export default creditsSlice.reducer;