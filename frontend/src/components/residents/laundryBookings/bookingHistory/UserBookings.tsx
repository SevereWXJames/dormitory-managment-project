import BookingsTable from "./BookingsTable.tsx";
import {useSelector} from "react-redux";
import {getUsername} from "../../../../context/authenticationSlice.ts";
import type {Booking} from "../../../../types/residents/types.tsx";
import {getBookingsByUser} from "../../../../context/residents/bookingsSlice.ts";

export function RecentBookings() {
    const user = useSelector(getUsername);
    const rows: Booking[] = useSelector(getBookingsByUser(user))
    return (
        <div>
            <BookingsTable rows={rows}/>
        </div>
    )
}