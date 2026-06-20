import { Box, TextField } from "@mui/material";
import BasicTimePicker from "./BasicTimePicker";
import MachineMenu from "./MachineMenu";
import { whiteInputSx } from "./reservationStyles";
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
                    sx={whiteInputSx}
                />
            </Box>
            <MachineMenu machine={machine} handleChange={handleMachineChange} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}


// import BasicTimePicker from "./BasicTimePicker.tsx";
// import {Box, TextField} from "@mui/material";
// import MachineMenu from "./MachineMenu.tsx";
// import type {Dayjs} from "dayjs";
// import {useState} from "react";
// import {useDispatch} from "react-redux";
// import {addBooking} from "../../../../context/residents/bookingsSlice.ts";
// import type {Booking} from "../../../../context/residents/bookingsSlice.ts";
// import type {SelectChangeEvent} from "@mui/material/Select";
//
// export function ReservationForm() {
//     const [eventName, setEventName] = useState("");
//     const [startTime, setStartTime] = useState<Dayjs | null>(null);
//     const [machine, setMachine] = useState('');
//
//     const dispatch = useDispatch();
//     const handleChange = (event: SelectChangeEvent) => {
//         setMachine(event.target.value as string);
//     };
//
//     const handleSubmit = () => {
//         console.log(eventName, startTime);
//         // dispatch your action here
//         const booking: Booking = {
//             _id: "booking_id_1", serviceId: machine, booked: true,
//             bookedBy: "user_id_1",
//             startTime: startTime
//         };
//         dispatch(addBooking(booking));
//     };
//
//     return (
//         <div>
//             <Box component="form" sx={{'& .MuiTextField-root': {m: 1, width: '25ch'}}}
//                  noValidate
//                  autoComplete="off">
//                 <BasicTimePicker label={"Start Time"}
//                                  onChange={(val) => setStartTime(val)}/>
//                 <TextField required id="outlined-required" label="Required"
//                            defaultValue="event-name"
//                            onChange={(e) => setEventName(e.target.value)}
//                            sx={{
//                                '& .MuiInputBase-input': {color: 'white'},
//                                '& .MuiInputLabel-root': {color: 'white'},
//                                '& .MuiOutlinedInput-Input': {color: 'white'}
//                            }}/>
//             </Box>
//             <MachineMenu machine={machine} handleChange={handleChange}/>
//             <button onClick={handleSubmit}>Submit</button>
//         </div>
//     )
// }