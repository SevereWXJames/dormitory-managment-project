import BookingsTable from "./BookingsTable.tsx";
import {useSelector} from "react-redux";
import {getUsername} from "../../../../context/authenticationSlice.ts";
import type {Booking} from "../../../../types/residents/types.tsx";
import {getBookingsByUser} from "../../../../context/residents/bookingsSlice.ts";

export function RecentBookings() {
    // const rows: bookingData[] = [{
    //     event_title: 'Washing hoodie',
    //     start_time: '11:00', end_time: '12:00', date: '06/17/26', machine_num: 1
    // }];
    const user = useSelector(getUsername);
    const rows: Booking[] = useSelector(getBookingsByUser(user))
    return (
        <div>
            <BookingsTable rows={rows}/>
        </div>
    )
}