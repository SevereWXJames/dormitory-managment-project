import { useState } from "react";
import type {Booking} from "../../../../types/residents/types.tsx";
import {useSelector} from "react-redux";
import {getBookingsByUser} from "../../../../context/residents/bookingsSlice.ts";


export function useBookings() {
    const [user, setUser] = useState("")
    const bookings: Booking[] = useSelector(getBookingsByUser(user))
    return {
        bookings
    };
}