import {useState} from "react";
import SelectBookings from "./SelectBookings.tsx";
import {Button} from "@mui/material";
import {ResponsiveDialog} from "../../../common/ResponsiveDialog.tsx";

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
        <SelectBookings/>
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