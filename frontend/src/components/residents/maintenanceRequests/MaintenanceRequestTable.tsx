import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx"
import type {MaintenanceRequestsProps} from "@/components/residents/maintenanceRequests/MaintenanceRequest.tsx";
type Row = MaintenanceRequestsProps

type TableProps = {
    rows: Row[],
}
export function MaintenanceRequestTable(props: TableProps) {
    return (
        <div className="max-h-[200px] overflow-y-auto [&>div]:overflow-visible flex">
            <Table>
                <TableCaption>{"Recent maintenance requests"}</TableCaption>
                <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                        {/* <TableHead className="text-right">Unit #</TableHead> */}
                        <TableHead className="text-left">Status</TableHead>
                        <TableHead className="text-left">Priority</TableHead>
                        <TableHead className="text-left">Issue</TableHead>
                        <TableHead className="text-left">Location</TableHead>
                        <TableHead className="text-left">Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {props.rows.map((row, index) => (
                        <TableRow key={index}>
                            {/* <TableCell className="font-medium">{row.unit}</TableCell> */}
                            <TableCell className="font-medium">{row.status}</TableCell>
                            <TableCell className="text-left">{row.priority}</TableCell>
                            <TableCell className="text-left">{row.issue}</TableCell>
                            <TableCell className="text-left">{row.location}</TableCell>
                            <TableCell className="text-left max-w-[200px] truncate" title={row.description}>
                                {row.description}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
