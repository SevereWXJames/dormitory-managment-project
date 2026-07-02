import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../authenticationSlice.ts';
import creditsReducer from '../residents/creditsSlice.ts';
import bookingsReducer from '../residents/bookingsSlice.ts';
import MaintenanceRequestReducer from '../residents/maintenanceRequestsSlice.ts';
import {api} from "@/context/api/api.ts";

export const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        credits: creditsReducer,
        bookings: bookingsReducer,
        maintenanceRequests: MaintenanceRequestReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;







// import { configureStore } from '@reduxjs/toolkit';
// import authenticationReducer from '../authenticationSlice.ts';
// import creditsReducer from '../residents/creditsSlice.ts';
// import bookingsReducer from '../residents/bookingsSlice.ts';
// import MaintenanceRequestReducer from '../residents/maintenanceRequestsSlice.ts';
//
// export const store = configureStore({
// 	reducer: {
// 		authentication: authenticationReducer,
// 		credits: creditsReducer,
//         bookings: bookingsReducer,
// 		maintenanceRequests: MaintenanceRequestReducer
// 	},
// });
//
// export type RootState = ReturnType<typeof store.getState>;
//
