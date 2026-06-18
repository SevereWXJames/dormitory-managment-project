import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import {Box, TextField} from "@mui/material";
import BasicTimePicker, {
    type BasicTimePickerProps
} from "../../../../../components/residents/laundryBookings/BasicTimePicker.tsx";
import MachineMenu from "../../../../../components/residents/laundryBookings/MachineMenu.tsx";
import BookingsTable, {type bookingData} from "../../../../../components/residents/laundryBookings/BookingsList.tsx";

export type Bookings = {
    date: Date,
    start_time: string,
    end_time: string,
    machine_id: string,
    event_title: string,
}
export type BookingsListProps = {
    bookings : Bookings[]
}
export function BookingForm(){
    const startTimeProps : BasicTimePickerProps = {label: "Start Time"}

    return(
        <div>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }}}
                noValidate
                autoComplete="off"
            >
                <BasicTimePicker label={startTimeProps.label}/>
                <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="event-name"
                />
                <button>Submit</button>
            </Box>
        </div>
    )
}

export function RecentBookingsList(){
    const rows: bookingData[] = [{
        event_title: 'Washing hoodie',
        start_time: '11:00', end_time: '12:00', date: '06/17/26'
    }];

    return(
        <div>
            <BookingsTable rows={rows}/>
        </div>
    )
}

export function PastBookingsList(){
    const rows: bookingData[] = [{
        event_title: 'Washing me socks',
        start_time: '13:00', end_time: '14:00', date: '06/10/26'
    }];

    return(
        <div>
            <BookingsTable rows={rows}/>
        </div>
    )

}

export function LaundryMachinesList(){
    return(
        <div>
            <MachineMenu/>
        </div>
    )
}

export function LaundryBookingsPage() {
    return (
        <>
            <CommonFrame commonFrameType={"RESIDENT"}/>
            <div className={"laundryBookingsPage"}>
                <div className={"machineList"}>
                    <strong>Laundry Machines</strong>
                    <LaundryMachinesList/>
                </div>
                <div className={"makeBooking"}>
                    <strong>Make a booking</strong>
                    <BookingForm/>
                </div>
                <div className={"pastBookings"}>
                    <strong>Past bookings</strong>
                    <PastBookingsList/>
                </div>
                <div className={"recentBookings"}>
                    <strong>Recent bookings</strong>
                    <RecentBookingsList/>
                </div>
            </div>
        </>
    )
}