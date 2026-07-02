import { createSlice } from '@reduxjs/toolkit';
import type { AuthenticationState } from '../app/types';
import type {RootState} from "./store/store.ts";

type AuthenticationSliceState = {
	authenticationState: AuthenticationState,
	email: string,
    username: string,
    userId: string,
};

const initialState: AuthenticationSliceState = {
	authenticationState: "UNAUTHENTICATED",
	email: "",
    username: "",
    userId: "",
};

/**
 * Redux slice for the authentication state.
 * This should be reviewed when authentication is implemented.
 */
export const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		logIn: (state, action) => {
            const { username, email, userId, roles } = action.payload;
            state.username = username;
            state.email = email;
            state.userId = userId ?? "";

            const roleList: string[] = Array.isArray(roles) ? roles : [];
            if (roleList.includes("Admin") || roleList.includes("Staff")) {
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

export const getEmail = (state: RootState) => {
    return state.authentication.email;
}

export const getUsername = (state: RootState) => {
    return state.authentication.username;
}

export const getUserId = (state: RootState) => {
    return state.authentication.userId;
}

export const getAuthenticationState = (state: RootState) => {
	return state.authentication.authenticationState;
}

export default authenticationSlice.reducer;