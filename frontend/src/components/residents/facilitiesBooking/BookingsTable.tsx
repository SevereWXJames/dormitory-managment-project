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
                    <TableHead className="text-right">End Time</TableHead>
                    <TableHead className="text-right">Duration (sec)</TableHead>
                    <TableHead className="text-right">Amount Paid</TableHead>
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
                        <TableCell className="text-right">N/A</TableCell>
                        <TableCell className="text-right">{<RowDropDown/>}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>Total</TableCell>
                    <TableCell className="text-right">N/A</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
