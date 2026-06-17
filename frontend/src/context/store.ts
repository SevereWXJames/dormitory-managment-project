import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../context/authenticationSlice';

export const store = configureStore({
	reducer: {
		authentication: authenticationReducer
	}
});