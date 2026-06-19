import {Button, List, ListItemButton, ListItemText} from "@mui/material";
import * as React from "react";
import {ResponsiveDialog} from "../../common/ResponsiveDialog.tsx";
import {BaseCalendar} from "./BaseCalendar.tsx";
import {ReservationForm} from "./reservationForm/ReservationForm.tsx";

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

    const events = [
        {
            id: '1',
            title: 'Morning Meeting',
            start: '2026-06-18T08:00:00',
            end: '2026-06-18T09:00:00',
            color: '#3498db'
        },
        {
            id: '2',
            title: 'Project Work',
            start: '2026-06-18T09:00:00',
            end: '2026-06-18T12:00:00',
            color: '#2ecc71'
        }
    ];

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