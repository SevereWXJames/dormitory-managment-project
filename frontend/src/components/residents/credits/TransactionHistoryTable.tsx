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
    return (
        <div className="max-h-[200px] overflow-y-auto [&>div]:overflow-visible flex">
            <Table>
                <TableCaption>{"Recent transactions"}</TableCaption>
                <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow className="text-left">
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.rows.map((row, index) => (
                        <TableRow key={index} className="text-left">
                            <TableCell className="font-medium">{row._id}</TableCell>
                            <TableCell className="font-medium">{row.userId}</TableCell>
                            <TableCell className="font-medium">{row.description}</TableCell>
                            <TableCell className="font-medium">{`$${(row.transaction / 100).toFixed(2)}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
