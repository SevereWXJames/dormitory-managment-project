import { Box, TextField } from "@mui/material";
import BasicTimePicker from "./BasicTimePicker";
import MachineMenu from "./MachineMenu";
// import { whiteInputSx } from "./reservationStyles";
import {useReservationForm} from "./useReservationForm";
import BasicDatePicker from "./DatePicker.tsx";

export function ReservationForm() {
    const {
        setEventName,
        setStartTime,
        setDate,
        machine,
        handleMachineChange,
        handleSubmit,
    } = useReservationForm();

    return (
        <div>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
            >
                <BasicTimePicker
                    label="Start Time"
                    onChange={setStartTime}
                />
                <BasicDatePicker onChange={setDate}/>
                <TextField
                    required
                    id="outlined-required"
                    label="Event Name"
                    defaultValue=""
                    onChange={(e) => setEventName(e.target.value)}
                />
            </Box>
            <MachineMenu machine={machine} handleChange={handleMachineChange} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}