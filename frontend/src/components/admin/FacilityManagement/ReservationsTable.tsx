import {useGetReservationsApi} from "@/components/admin/FacilityManagement/hooks/useGetReservationsApi.tsx";
import {BookingsTable} from "@/components/common/BookingsTable.tsx";
import {useGetHumanReadableTime} from "@/components/residents/facilitiesBooking/hooks/useGetHumanReadableTime.tsx";
import type {Booking} from "@/types/residents/types.ts";

export function ReservationsTable(){
    const {bookings, isLoading, isError, error} = useGetReservationsApi();
    const {getTime} = useGetHumanReadableTime();
    const rows = bookings.map((row : Booking) =>
        ({...row, timeString: getTime(row.startTime)}));

    if(isLoading) return <p>Loading...</p>;
    if(isError) return <p>Error: {error}</p>;

    return(
        <BookingsTable caption={"Reservations"} rows={rows}/>
    )

}