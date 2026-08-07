import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"
import type {Transaction} from "@/types/residents/types.ts";
import { useGetHumanReadableTime } from "../facilitiesBooking/hooks/useGetHumanReadableTime";

// type Row = {
//     id: number,
//     cardNumber: number,
//     date: string,
//     amount: number
// };

type TableProps = {
    rows: Transaction[],
}
export function TransactionHistoryTable(props: TableProps) {
    const {getTime} = useGetHumanReadableTime();

    return (
        <div className="max-h-[200px] overflow-y-auto [&>div]:overflow-visible flex">
            <Table>
                <TableCaption>{"Recent transactions"}</TableCaption>
                <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow className="text-left">
                        <TableHead>Description</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.rows.map((row, index) => (
                        <TableRow key={index} className="text-left">
                            <TableCell className="font-medium">{row.description}</TableCell>
                            <TableCell className="font-medium">{getTime(row.date)}</TableCell>
                            <TableCell className="font-medium">{`$${(row.transaction / 100).toFixed(2)}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
