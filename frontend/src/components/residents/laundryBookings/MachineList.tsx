import {Button, List, ListItemButton, ListItemText} from "@mui/material";
import * as React from "react";
import {ResponsiveDialog} from "../../common/ResponsiveDialog.tsx";
import {BaseCalendar} from "./BaseCalendar.tsx";

export type MachineListProps = { machine_ids: string[] }

export type OptionButtonsProps = {
    machine_ids: string[],
    onClick: () => void
}

export function OptionButtons({machine_ids, onClick}: OptionButtonsProps) {
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

export function MachineList({machine_ids}: MachineListProps) {
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
            start: '2024-01-01T08:00:00',
            end: '2024-01-01T09:00:00',
            color: '#3498db'
        },
        {
            id: '2',
            title: 'Project Work',
            start: '2024-01-02T09:00:00',
            end: '2024-01-02T12:00:00',
            color: '#2ecc71'
        }
    ];

    const dialogContent = <div>
        <BaseCalendar events={events}/>
        <Button autoFocus onClick={handleClose}>
            Confirm
        </Button>
        <Button autoFocus onClick={handleClose}>
            Cancel
        </Button>
    </div>

    return (<>
        <OptionButtons machine_ids={machine_ids} onClick={handleClickOpen}/>
        <ResponsiveDialog open={open} handleClose={handleClose}
                          content={dialogContent}/>
    </>)
}