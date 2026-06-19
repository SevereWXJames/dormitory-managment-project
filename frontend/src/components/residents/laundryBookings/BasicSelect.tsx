import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
    const [booking, setBooking] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setBooking(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={booking}
                    label="Bookings"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Booking 1</MenuItem>
                    <MenuItem value={20}>Booking 2</MenuItem>
                    <MenuItem value={30}>Booking 3</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}