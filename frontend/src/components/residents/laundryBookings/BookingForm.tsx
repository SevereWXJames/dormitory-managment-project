import BasicTimePicker, {type BasicTimePickerProps} from "./BasicTimePicker.tsx";
import {Box, TextField} from "@mui/material";
import {LaundryMachinesMenu} from "../../../pages/common/residents/dashboard/dynamic/LaundryBookingsPage.tsx";

export function BookingForm() {
    const startTimeProps: BasicTimePickerProps = {label: "Start Time"}

    return (
        <div>
            <Box
                component="form"
                sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
                noValidate
                autoComplete="off"
            >
                <BasicTimePicker label={startTimeProps.label}/>
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="event-name"
                    sx={{
                        '& .MuiInputBase-input': {color: 'white'},
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiOutlinedInput-Input': {
                            color: 'white',
                        }
                    }}
                />
            </Box>
            <LaundryMachinesMenu/>
            <button>Submit</button>
        </div>
    )
}