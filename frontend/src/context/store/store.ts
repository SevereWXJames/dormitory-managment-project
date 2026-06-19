import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../authenticationSlice.ts';
import creditsReducer from '../residents/creditsSlice.ts';
import bookingsReducer from '../residents/bookingsSlice.ts';

export const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		credits: creditsReducer,
        bookings: bookingsReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;

