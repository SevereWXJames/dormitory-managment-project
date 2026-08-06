import {useGetReservationsApi} from "@/components/admin/FacilityManagement/hooks/useGetReservationsApi.tsx";
import {BookingsTable} from "@/components/common/BookingsTable.tsx";
import {useGetHumanReadableTime} from "@/components/residents/facilitiesBooking/hooks/useGetHumanReadableTime.tsx";
import type {Booking} from "@/types/residents/types.ts";


const sortByUpcomingTime = (a: Booking, b: Booking)=> {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
}

const sortByService = (a: Booking, b: Booking)=> {
    return a.serviceId.localeCompare(b.serviceId);
}


const compareFns : Record<string, (a: Booking, b: Booking) => number> = {
    "upcoming" : sortByUpcomingTime,
    "service" : sortByService,
}

type ReservationsTableProps = {
    sortSelection : string | null;
}

export function ReservationsTable(props : ReservationsTableProps){
    const {bookings, isLoading, isError, error} = useGetReservationsApi();
    const {getTime} = useGetHumanReadableTime();
    const sortOption : string = props.sortSelection ?? "upcoming";

    if(isLoading) return <p>Loading...</p>;
    if(isError) return <p>Error: {error}</p>;

    const rows = bookings.map((row : Booking) =>
        ({...row, timeString: getTime(row.startTime)})).sort(compareFns[sortOption]);


    return(
        <BookingsTable caption={"Reservations"} rows={rows} displayIds={false} displayNames={true}/>
    );
}