import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";

export interface props {
    bookedSlots: object[]
}


export function LaundryBookingsPage() {
    return (
        <>
            <CommonFrame commonFrameType={"RESIDENT"}/>
            <div className="laundryBookingsPage">
                <h1>Laundry Bookings</h1>
                <div>Data Visualization</div>
                <div>Reserve Times</div>
                <div>Confirm Booking</div>
            </div>
        </>
    )
}