import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"
import {RowDropDown} from "@/components/residents/facilitiesBooking/RowDropDown.tsx";
import {useGetHumanReadableDuration, useGetHumanReadableTime} from "@/components/residents/facilitiesBooking/hooks/useGetHumanReadableTime.tsx";
import {useGetUserBookingsApi} from "@/components/residents/facilitiesBooking/hooks/useGetUserBookingsApi.tsx";

type TableProps = {
    // rows: Booking[],
    caption: string,
}

export function BookingsTable(props: TableProps) {
    const {bookings} = useGetUserBookingsApi();
    const {getTime} = useGetHumanReadableTime();
    const {getDuration} = useGetHumanReadableDuration();
    const rows = bookings.map((row) =>
        ({...row, timeString: getTime(row.startTime)}));

    return (
        <Table>
            <TableCaption>{props.caption}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Booking ID</TableHead>
                    <TableHead>Machine Name</TableHead>
                    <TableHead className="text-right">Start Time</TableHead>
                    <TableHead className="text-right">Duration (sec)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map((row) => (
                    <TableRow key={row._id}>
                        <TableCell className="font-medium">{row._id}</TableCell>
                        <TableCell className="font-medium">{row.serviceName}</TableCell>
                        <TableCell className="text-right">{row.timeString}</TableCell>
                        <TableCell className="text-right">{getDuration(row.durationSeconds)}</TableCell>
                        <TableCell className="text-right">{<RowDropDown bookingInfo={row}/>}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
            </TableFooter>
        </Table>
    )
}
