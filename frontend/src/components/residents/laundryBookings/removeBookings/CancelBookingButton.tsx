import {useState} from "react";
import SelectBookings from "./SelectBookings.tsx";
import {Button} from "@mui/material";
import {ResponsiveDialog} from "../../../common/ResponsiveDialog.tsx";
import {useDispatch} from "react-redux";
import {removeBooking} from "../../../../context/residents/bookingsSlice.ts";

export function CancelBookingButton() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [bookingId, setBookingId] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = () => {
        dispatch(removeBooking(bookingId));
        setOpen(false);
    }

    const content = <div><strong>Cancel Booking?</strong></div>
    const actions = <div>
        <SelectBookings value={bookingId} setValue={setBookingId}/>
        <Button onClick={handleSubmit}>Confirm</Button>
        <Button onClick={handleClose}>Cancel</Button>
    </div>

    return (
        <div>
            <Button onClick={handleClickOpen}>Cancel Booking</Button>
            <ResponsiveDialog open={open} handleClose={handleClose} content={content} actions={actions}/>
        </div>
    )
}