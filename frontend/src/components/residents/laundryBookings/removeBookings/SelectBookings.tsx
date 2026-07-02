import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type {SelectChangeEvent} from '@mui/material/Select';
import {useSelector} from "react-redux";
import {getBookingsByUser} from "../../../../context/residents/bookingsSlice.ts";
import {getUserId} from "../../../../context/authenticationSlice.ts";
import type {Booking} from "../../../../types/residents/types.tsx";

export type SelectBookingsProps = {
    value: string,
    setValue: (id: string)=> void;
}

export default function SelectBookings({value, setValue} : SelectBookingsProps) {
    // const [booking, setBooking] = useState('');
    const userId: string = useSelector(getUserId);
    const bookings: Booking[] = useSelector(getBookingsByUser(userId));
    const options: { val: string, name: string }[] = bookings.map((elm) =>
        ({val: elm._id, name: elm.eventName}));

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };

    return (
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label="Bookings"
                    onChange={handleChange}>
                    {options.map((elm) => (
                            <MenuItem value={elm.val}>{elm.name}</MenuItem>))}
                </Select>
            </FormControl>
        </Box>
    );
}