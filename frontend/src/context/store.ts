import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './authenticationSlice';
import creditsReducer from './residents/creditsSlice';

export const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		credits: creditsReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
