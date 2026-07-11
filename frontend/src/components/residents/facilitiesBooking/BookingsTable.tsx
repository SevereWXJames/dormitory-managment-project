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
import type {Booking} from "@/types/residents/types.ts";

// type Row = {
//     machineId: string,
//     date: string,
//     startTime: string,
//     endTime: string,
//     amountPaid: number,
// }

type TableProps = {
    rows: Booking[],
    caption: string,
}
export function BookingsTable(props: TableProps) {
    return (
        <Table>
            <TableCaption>{props.caption}</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Machine Id</TableHead>
                    <TableHead className="text-right">Start Time</TableHead>
                    <TableHead className="text-right">Duration (sec)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.rows.map((row) => (
                    <TableRow key={row.date}>
                        <TableCell className="font-medium">{row.date}</TableCell>
                        <TableCell className="font-medium">{row.serviceId}</TableCell>
                        <TableCell className="text-right">{row.startTime}</TableCell>
                        <TableCell className="text-right">{row.durationSeconds}</TableCell>
                        <TableCell className="text-right">{<RowDropDown bookingInfo={row}/>}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
            </TableFooter>
        </Table>
    )
}
