import {Button, List, ListItemButton, ListItemText} from "@mui/material";
import {ResponsiveDialog} from "../../common/ResponsiveDialog.tsx";
import {BaseCalendar} from "./BaseCalendar.tsx";
import {ReservationForm} from "./reservationForm/ReservationForm.tsx";
import type {Booking} from "../../../types/residents/types.tsx";
import {useState} from "react";
import {useSelector} from "react-redux";
import {getBookingsByMachine} from "../../../context/residents/bookingsSlice.ts";

export type MachineOptionsProps = { machine_ids: string[] }

export type MachineButtonsProps = {
    machine_ids: string[],
    onClick: (id: string) => void
}

export function MachineButtons({machine_ids, onClick}: MachineButtonsProps) {
    return (
        <List>
            {machine_ids.map((id: string) => {
                return (
                    <ListItemButton
                        key={id}
                        sx={{border: '1px solid white'}}
                        onClick={() => onClick(id)}>
                        <ListItemText primary={id}/>
                    </ListItemButton>)
            })}
        </List>
    )
}

export function MachineOptions({machine_ids}: MachineOptionsProps) {
    const [open, setOpen] = useState(false);
    const [machine, setMachine] = useState("");
    const handleClickOpen = (id: string) => {
        setMachine(id);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //Example of events:
    const bookings: Booking[] = useSelector(getBookingsByMachine(machine));
    const events = bookings.map((elm) =>
        ({
            id: elm._id,
            title: elm.eventName,
            start: elm.startTime ?? "",
            end: elm.startTime ?? "",
            color: '#3498db'
        }))

    //Dialog Content
    const dialogContent = <div>
        <BaseCalendar events={events}/>
        <ReservationForm/>
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