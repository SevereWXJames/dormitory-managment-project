import {Button, List, ListItemButton, ListItemText} from "@mui/material";
import * as React from "react";
import {ResponsiveDialog} from "../../common/ResponsiveDialog.tsx";
import {BaseCalendar} from "./BaseCalendar.tsx";
import {ReservationForm} from "./reservationForm/ReservationForm.tsx";
import {useSelector} from "react-redux";
import {getAllBookings} from "../../../context/residents/bookingsSlice.ts";
import type {Booking} from "../../../types/residents/types.tsx";

export type MachineOptionsProps = { machine_ids: string[] }

export type MachineButtonsProps = {
    machine_ids: string[],
    onClick: () => void
}

export function MachineButtons({machine_ids, onClick}: MachineButtonsProps) {
    return (
        <List>
            {machine_ids.map((id: string) => {
                return (
                    <ListItemButton
                        key={id}
                        sx={{border: '1px solid white'}}
                        onClick={onClick}>
                        <ListItemText primary={id}/>
                    </ListItemButton>)
            })}
        </List>
    )
}

export function MachineOptions({machine_ids}: MachineOptionsProps) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    //Example of events:
    const bookings: Booking[] = useSelector(getAllBookings);
    const events = bookings.map((elm) =>
        ({
            id: elm._id,
            title: elm.eventName,
            startDate: elm.startTime?.toISOString() ?? "",
            endDate: elm.startTime?.add(1, "hour").toISOString() ?? "",
            color: '#3498db'
        }))

    //Dialog Content
    const dialogContent = <div>
        <BaseCalendar events={events}/>
        <ReservationForm/>
        <Button autoFocus onClick={handleClose}>
            Confirm
        </Button>
        <Button autoFocus onClick={handleClose}>
            Cancel
        </Button>
    </div>

    return (<div className={"bookings_dialog"}>
        <MachineButtons machine_ids={machine_ids} onClick={handleClickOpen}/>
        <ResponsiveDialog open={open} handleClose={handleClose}
                          content={dialogContent}/>
    </div>)
}