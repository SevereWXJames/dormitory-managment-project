import { createSlice } from '@reduxjs/toolkit';
import type { AuthenticationState } from '../app/types';

const initialState: {
	authenticationState: AuthenticationState
} = {
	authenticationState: "UNAUTHENTICATED"
};

export const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		logIn: (state, parameters) => {
			const email = parameters.payload[0];
			// const password = parameters.payload[1];

			if (email.includes("admin")) {
				state.authenticationState = "BUILDING_MANAGER";
			}
			else {
				state.authenticationState = "RESIDENT";
			}
		},
		logOut: (state) => {
			state.authenticationState = "UNAUTHENTICATED";
		}
	}
});

export const { logIn, logOut } = authenticationSlice.actions;

export default authenticationSlice.reducer;