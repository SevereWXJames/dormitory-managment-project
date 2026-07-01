import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"

type Row = {
    id: number,
    cardNumber: number,
    date: string,
    amount: number
};

type TableProps = {
    rows: Row[],
}
export function TransactionHistoryTable(props: TableProps) {
    return (
        <div className="max-h-[200px] overflow-y-auto [&>div]:overflow-visible flex">
            <Table>
                <TableCaption>{"Recent maintenance requests"}</TableCaption>
                <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow className="text-left">
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>Card Number</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.rows.map((row, index) => (
                        <TableRow key={index} className="text-left">
                            <TableCell className="font-medium">{row.id}</TableCell>
                            <TableCell className="font-medium">{row.cardNumber}</TableCell>
                            <TableCell className="font-medium">{row.date}</TableCell>
                            <TableCell className="font-medium">{row.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
