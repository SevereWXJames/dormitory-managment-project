import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import MachineMenu from "../../../../../components/residents/laundryBookings/MachineMenu.tsx";
import BookingsTable, {type bookingData} from "../../../../../components/residents/laundryBookings/BookingsTable.tsx";
import {MachineOptions} from "../../../../../components/residents/laundryBookings/MachineOptions.tsx";
import {BookingForm} from "../../../../../components/residents/laundryBookings/BookingForm.tsx";
import {useState} from "react";
import {ResponsiveDialog} from "../../../../../components/common/ResponsiveDialog.tsx";
import {Button} from "@mui/material";
import BasicSelect from "../../../../../components/residents/laundryBookings/BasicSelect.tsx";

export type Bookings = {
    date: Date,
    start_time: string,
    end_time: string,
    machine_id: string,
    event_title: string,
}

export function CancelBookingButton() {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const content = <div><strong>Cancel Booking?</strong></div>
    const actions = <div>
        <BasicSelect/>
        <Button onClick={handleClose}>Confirm</Button>
        <Button onClick={handleClose}>Cancel</Button>
    </div>

    return (
        <div>
            <Button onClick={handleClickOpen}>Cancel Booking</Button>
            <ResponsiveDialog open={open} handleClose={handleClose} content={content} actions={actions}/>
        </div>
    )
}

export function RecentBookings() {
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

export function PastBookings() {
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

export function LaundryMachinesList() {
    const machines: string[] = ["Machine 1", "Machine 2", "Machine 3"]
    return (
        <div>
            <MachineOptions machine_ids={machines}/>
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
                            <strong>Cancel a booking</strong>
                            <CancelBookingButton/>
                        </div>
                        <div className={"tables"}>
                            <div className={"recentBookings"}>
                                <strong>Recent bookings</strong>
                                <RecentBookings/>
                            </div>
                            <div className={"pastBookings"}>
                                <strong>Past bookings</strong>
                                <PastBookings/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}