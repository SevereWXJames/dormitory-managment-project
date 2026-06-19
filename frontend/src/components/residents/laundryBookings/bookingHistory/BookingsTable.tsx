import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type {Booking} from "../../../../types/residents/types.tsx";

export type bookingData = {
    event_title: string,
    start_time: string,
    end_time: string,
    date: string,
    machine_num: number,
}

export type BookingsTableProps = {
    rows : Booking[];
}

export default function BookingsTable({rows} : BookingsTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell align="right">Event Title</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Machine</TableCell>
                        <TableCell align="right">Start Time</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.eventName}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            <TableCell component="th" scope="row">
                                {row.date?.format(("MMM D, YYYY"))?? "_"}
                            </TableCell>
                            <TableCell align="right">{row.eventName}</TableCell>
                            <TableCell align="right">{row.date?.format(("MMM D, YYYY"))?? "_"}</TableCell>
                            <TableCell align="right">{row.serviceId}</TableCell>
                            <TableCell align="right">{row.startTime?.format("HH:mm") ?? "—"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
