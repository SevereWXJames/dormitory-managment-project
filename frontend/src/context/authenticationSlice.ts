import { createSlice } from '@reduxjs/toolkit';
import type { AuthenticationState } from '../types/residents/types.ts';
import type {RootState} from "./store/store.ts";
import type {Role} from "@/dataTypes/user.ts";
import {authApi} from "@/context/api/apiServices/authApi.ts";

type AuthenticationSliceState = {
	authenticationState: AuthenticationState,
    name: string,
	email: string,
    username: string,
    phoneNumber: string,
    userId: string,
    userRole: Role[],
};

const initialState: AuthenticationSliceState = {
	authenticationState: "UNAUTHENTICATED",
    name: "",
	email: "",
    username: "",
    phoneNumber: "",
    userId: "",
    userRole: []
};

// Shared logic for any successful auth response containing a user object
function setUserFromAuthResponse(state: AuthenticationSliceState,
                                 user: { username: string; email: string; _id: string; roles: string[] }
) {
    state.username = user.username;
    state.email = user.email;
    state.userId = user._id;
    state.userRole = user.roles as Role[];
}

/**
 * Redux slice for the authentication state.
 * This should be reviewed when authentication is implemented.
 */
export const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		logIn: (state, action) => {
            const { name, username, email, phoneNumber, userId, roles } = action.payload;
            console.log(`action payload: ${JSON.stringify(action.payload)}`);
            state.name = name;
            state.username = username;
            state.email = email;
            state.phoneNumber = phoneNumber;
            state.userId = userId ?? "";
            state.userRole = roles ?? [];

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
	},
    /*
    * These extra reducers are required to resolve race conditions between
    * */
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, action) => {
                setUserFromAuthResponse(state, action.payload.data);
            })
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                setUserFromAuthResponse(state, action.payload.data);
            })
            .addMatcher(authApi.endpoints.signUp.matchFulfilled, (state, action) => {
                setUserFromAuthResponse(state, action.payload.data);
            })
            .addMatcher(authApi.endpoints.refresh.matchRejected, () => initialState);
    },
});

export const { logIn, logOut } = authenticationSlice.actions;

export const getName = (state: RootState) => {
    return state.authentication.name;
}

export const getEmail = (state: RootState) => {
    return state.authentication.email;
}

export const getUsername = (state: RootState) => {
    return state.authentication.username;
}

export const getPhoneNumber = (state: RootState) => {
    return state.authentication.phoneNumber;
}

export const getUserId = (state: RootState) => {
    return state.authentication.userId;
}

export const getUserRole = (state: RootState) => {
    return state.authentication.userRole;
}

export const getAuthenticationState = (state: RootState) => {
	return state.authentication.authenticationState;
}

export default authenticationSlice.reducer;