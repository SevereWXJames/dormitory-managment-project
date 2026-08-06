import {useGetHumanReadableTime} from "@/components/residents/facilitiesBooking/hooks/useGetHumanReadableTime.tsx";
import {useGetUserBookingsApi} from "@/components/residents/facilitiesBooking/hooks/useGetUserBookingsApi.tsx";
import {BookingsTable} from "@/components/common/BookingsTable.tsx";

type TableProps = {
    caption: string,
}

export function UserBookingsTable(props: TableProps) {
    const {bookings} = useGetUserBookingsApi();
    const {getTime} = useGetHumanReadableTime();
    const rows = bookings.map((row) =>
        ({...row, timeString: getTime(row.startTime)}));

    return <BookingsTable caption={props.caption} rows={rows}/>;
}
