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
import {useGetHumanReadableDuration} from "@/components/residents/facilitiesBooking/hooks/useGetHumanReadableTime.tsx";

type TableRow = {

    timeString: string,
    _id: string,
    eventName: string,
    serviceId: string,
    serviceName: string | null,
    booked: boolean,
    bookedBy: string | null,
    bookedByName?: string | null,
    startTime: Date,
    durationSeconds?: number,
}

type TableProps = {
    caption: string,
    rows : TableRow[],
    displayNames? : boolean;
}

export function BookingsTable(props: TableProps) {
    const {getDuration} = useGetHumanReadableDuration();

    return (
        <Table>
            <TableCaption>{props.caption}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Machine Name</TableHead>
                    {props.displayNames && <TableHead className="w-[100px]">Booked By</TableHead>}
                    <TableHead className="text-right">Machine Name</TableHead>
                    <TableHead className="text-right">Start Time</TableHead>
                    <TableHead className="text-right">Duration (sec)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.rows.map((row) => (
                    <TableRow key={row._id}>
                        <TableCell className="font-medium">{row.serviceName}</TableCell>
                        {props.displayNames && <TableCell className="font-medium">{row.bookedByName}</TableCell>}
                        <TableCell className="text-right">{row.serviceName}</TableCell>
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
