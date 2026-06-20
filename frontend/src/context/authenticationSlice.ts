import { createSlice } from '@reduxjs/toolkit';
import type { AuthenticationState } from '../app/types';
import type {RootState} from "./store.ts";

type AuthenticationSliceState = {
	authenticationState: AuthenticationState,
	email: string,
    username: string,
};

const initialState: AuthenticationSliceState = {
	authenticationState: "UNAUTHENTICATED",
	email: "",
    username: "",
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
            const username = parameters.payload[0];
			const email = parameters.payload[1];
            console.log(username);
            console.log(email);
			// const password = parameters.payload[2];

			if (email.includes("admin")) {
				state.authenticationState = "BUILDING_MANAGER";
			}
			else {
				state.authenticationState = "RESIDENT";
			}
            state.username = username;
            state.email = email;
		},
		logOut: (state) => {
			state.authenticationState = "UNAUTHENTICATED";
		}
	}
});

export const { logIn, logOut } = authenticationSlice.actions;

export const getEmail = (state: RootState) => {
    return state.authentication.email;
}

export const getUsername = (state: RootState) => {
    return state.authentication.username;
}

export const getAuthenticationState = (state: RootState) => {
	return state.authentication.authenticationState;
}

export default authenticationSlice.reducer;