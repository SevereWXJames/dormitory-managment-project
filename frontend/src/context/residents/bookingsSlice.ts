import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../store/store.ts';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {Dayjs} from "dayjs";

/**
 * State for the creditsSlice.
 * @property credits {number} Credits represented as a number of cents.
 */
export type Booking = {
    _id: string;
    serviceId: string;
    booked: boolean;
    bookedBy: string | null;
    startTime: Dayjs | null;
    durationSeconds?: number;
}

export type BookingsSliceState = {
    bookings: Booking[]
};

const initialState: BookingsSliceState = {
    bookings: []
};

/**
 * Redux slice for the user's credits.
 */
export const bookingsSlice = createSlice({
    name: 'credits',
    initialState,
    reducers: {
        addBooking: (state, action: PayloadAction<Booking>) => {
            state.bookings.push(action.payload);
            console.log("Added Booking!");
        },
        removeBooking: (state, action:PayloadAction<string>) => {
            const toRemove = state.bookings.find((elm) =>
                (elm._id == action.payload))
            if (toRemove != undefined) {
                const index = state.bookings.indexOf(toRemove);
                state.bookings.splice(index, 1);
            }
            console.log("Removed Booking!");
        },
    }
});

export const {addBooking, removeBooking} = bookingsSlice.actions;

/**
 *  Returns the amount of credits as a number of cents.
 *
 * @param state {BookingsSliceState} State for the creditsSlice.
 * @returns Amount of credits as a number of cents.
 */
export const getAllBookings = (state: RootState) => {
    return state.bookings.bookings;
}

export const getBookingsByUser = (user: string) => (state: RootState) => {
    return state.bookings.bookings.filter((elm) => (elm.bookedBy == user));
}

export const getBookingsByMachine = (machineId: string) => (state: RootState) => {
    return state.bookings.bookings.filter((elm) => (elm.serviceId = machineId));
}


export default bookingsSlice.reducer;