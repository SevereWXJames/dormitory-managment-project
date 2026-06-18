import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import {Box, TextField} from "@mui/material";
import BasicTimePicker, {
    type BasicTimePickerProps
} from "../../../../../components/residents/laundryBookings/BasicTimePicker.tsx";
import MachineMenu from "../../../../../components/residents/laundryBookings/MachineMenu.tsx";
import BookingsTable, {type bookingData} from "../../../../../components/residents/laundryBookings/BookingsList.tsx";
import {MachineList} from "../../../../../components/residents/laundryBookings/MachineList.tsx";

export type Bookings = {
    date: Date,
    start_time: string,
    end_time: string,
    machine_id: string,
    event_title: string,
}
export type BookingsListProps = {
    bookings: Bookings[]
}

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

export function RecentBookingsList() {
    const rows: bookingData[] = [{
        event_title: 'Washing hoodie',
        start_time: '11:00', end_time: '12:00', date: '06/17/26', machine_num: 1
    }];

    return (
        <div>
            <BookingsTable rows={rows}/>
        </div>
    )
}

export function PastBookingsList() {
    const rows: bookingData[] = [{
        event_title: 'Washing me socks',
        start_time: '13:00', end_time: '14:00', date: '06/10/26', machine_num: 3
    }];

    return (
        <div>
            <BookingsTable rows={rows}/>
        </div>
    )

}

export function LaundryMachinesList(){
    const machines : string[] = ["Machine 1", "Machine 2", "Machine 3"]
    return(
        <div>
            <MachineList machine_ids={machines}/>
        </div>
    )
}

export function LaundryMachinesMenu() {
    return (
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
                <div className={"contents"}>
                    <div className={"machineList"}>
                        <strong>Laundry Machines</strong>
                        <LaundryMachinesList/>
                    </div>
                    <div className={"bookingsColumn"}>
                        <div className={"bookingForm"}>
                            <strong>Make a booking</strong>
                            <BookingForm/>
                        </div>
                        <div className={"tables"}>
                            <div className={"pastBookings"}>
                                <strong>Past bookings</strong>
                                <PastBookingsList/>
                            </div>
                            <div className={"recentBookings"}>
                                <strong>Recent bookings</strong>
                                <RecentBookingsList/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}