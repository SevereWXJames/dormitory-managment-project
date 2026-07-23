import {createSlice} from '@reduxjs/toolkit';
import type {AuthenticationState} from '../types/residents/types.ts';
import type {RootState} from "./store/store.ts";
import type {Role} from "@/dataTypes/user.ts";
import {authApi, type AuthUser} from "@/context/api/apiServices/authApi.ts";

type AuthenticationSliceState = {
    authenticationState: AuthenticationState,
    email: string,
    username: string,
    userId: string,
    userRole: Role[],
};

const initialState: AuthenticationSliceState = {
    authenticationState: "UNAUTHENTICATED",
    email: "",
    username: "",
    userId: "",
    userRole: []
};

// Shared logic for any successful auth response containing a user object
function setUserFromAuthResponse(state: AuthenticationSliceState, user: AuthUser) {
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
            const {username, email, userId, roles} = action.payload;
            console.log(`action payload: ${JSON.stringify(action.payload)}`);
            state.username = username;
            state.email = email;
            state.userId = userId ?? "";
            state.userRole = roles ?? [];

            const roleList: string[] = Array.isArray(roles) ? roles : [];
            if (roleList.includes("Admin") || roleList.includes("Staff")) {
                state.authenticationState = "BUILDING_MANAGER";
            } else {
                state.authenticationState = "RESIDENT";
            }
        },
        logOut: (state) => {
            state.authenticationState = "UNAUTHENTICATED";
        }
    },
    /*
    * These extra reducers are required to resolve race conditions between redirection
    *  and dispatching user info to the store
    * */
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, action) => {
                console.log('refresh fulfilled payload:', action.payload);
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

export const {logIn, logOut} = authenticationSlice.actions;

export const getEmail = (state: RootState) => {
    return state.authentication.email;
}

export const getUsername = (state: RootState) => {
    return state.authentication.username;
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