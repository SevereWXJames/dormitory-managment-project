import {createSlice} from '@reduxjs/toolkit';
import type {RootState} from '../store/store.ts';

/**
 * State for the creditsSlice.
 * @property credits {number} Credits represented as a number of cents.
 */
type Booking = {
    _id: string;
    serviceId: string;
    booked: boolean;
    bookedBy: string | null;
    startTime: number;
    durationSeconds: number;
}

type BookingsSliceState = {
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
        addBooking: (state, parameters) => {
            state.bookings.push(parameters.payload);
            console.log("Added Booking!");
        },
        removeBooking: (state, parameters) => {
            const toRemove = state.bookings.find((elm) =>
                (elm._id == parameters.payload._id))
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