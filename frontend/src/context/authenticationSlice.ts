import { createSlice } from '@reduxjs/toolkit';
import type { AuthenticationState } from '../app/types';

type AuthenticationSliceState = {
	authenticationState: AuthenticationState,
	email: string
};

const initialState: AuthenticationSliceState = {
	authenticationState: "UNAUTHENTICATED",
	email: ""
};

/**
 * Redux slice for the authentication state.
 * This should be reviewed when authentication is implemented.
 */
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

			state.email = email;
		},
		logOut: (state) => {
			state.authenticationState = "UNAUTHENTICATED";
		}
	}
});

export const { logIn, logOut } = authenticationSlice.actions;

export const getEmail = (state: AuthenticationSliceState) => {
	return state.email;
}

export const getAuthenticationState = (state: AuthenticationSliceState) => {
	return state.authenticationState;
}

export default authenticationSlice.reducer;