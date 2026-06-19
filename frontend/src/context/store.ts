import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authenticationSlice';
import creditsReducer from './residents/creditsSlice';
import maintenanceRequestsSliceReducer from './residents/maintenanceRequestsSlice';

export const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		credits: creditsReducer,
		maintenanceRequests: maintenanceRequestsSliceReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
