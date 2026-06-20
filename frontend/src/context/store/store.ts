import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../authenticationSlice.ts';
import creditsReducer from '../residents/creditsSlice.ts';
import bookingsReducer from '../residents/bookingsSlice.ts';
import MaintenanceRequestReducer from '../residents/maintenanceRequestsSlice.ts';

export const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		credits: creditsReducer,
        bookings: bookingsReducer,
		maintenanceRequests: MaintenanceRequestReducer
	},
});

export type RootState = ReturnType<typeof store.getState>;

