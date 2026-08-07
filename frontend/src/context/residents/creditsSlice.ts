import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store.ts';

/**
 * State for the creditsSlice.
 * @property credits {number} Credits represented as a number of cents.
 */
type CreditsSliceState = {
	credits: number
	transactionHistory: {
		_id: string,
		userId: string,
		description: string,
		transaction: number,
        date: Date
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
		setCredits: (state, parameters) => {
			state.credits = parameters.payload;
		},

		setTransactionHistory: (state, parameters) => {
			state.transactionHistory = parameters.payload;
		},

		addCredits: (state, parameters) => {
			state.credits += parameters.payload.amount;
		},

        removeCredits: (state, parameters) => {
            state.credits -= parameters.payload;
        },

        addTransactionHistoryEntry: (state, parameters) => {
			const id = state.transactionHistory.length + 1;
			const amount = parameters.payload.amount;
            const date = new Date();

			state.transactionHistory.push({_id: `trans${id}`, userId: '', description: '', transaction: amount, date: date});
		}
	}
});

export const { addCredits, addTransactionHistoryEntry, removeCredits, setCredits, setTransactionHistory } = creditsSlice.actions;

/**
 * Returns the amount of credits as a number of cents.
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