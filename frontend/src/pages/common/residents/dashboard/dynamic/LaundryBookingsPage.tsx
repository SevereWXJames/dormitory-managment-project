import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import {MachineOptions} from "../../../../../components/residents/laundryBookings/MachineButtons.tsx";
import {ReservationForm} from "../../../../../components/residents/laundryBookings/reservationForm/ReservationForm.tsx";
import {
    CancelBookingButton
} from "../../../../../components/residents/laundryBookings/removeBookings/CancelBookingButton.tsx";
import {
    RecentBookings
} from "../../../../../components/residents/laundryBookings/bookingHistory/UserBookings.tsx";

export type Bookings = {
    date: Date,
    start_time: string,
    end_time: string,
    machine_id: string,
    event_title: string,
}

export function LaundryMachinesList() {
    const machines: string[] = ["machine_1", "machine_2", "machine_3"]
    return (
        <div>
            <MachineOptions machine_ids={machines}/>
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
                            <ReservationForm/>
                            <strong>Cancel a booking</strong>
                            <CancelBookingButton/>
                        </div>
                        <div className={"tables"}>
                            <div className={"recentBookings"}>
                                <strong>Recent bookings</strong>
                                <RecentBookings/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}