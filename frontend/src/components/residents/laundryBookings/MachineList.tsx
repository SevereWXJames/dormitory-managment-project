import {List, ListItemButton, ListItemText} from "@mui/material";

export type MachineListProps = { machine_ids: string[] }

export function MachineList({machine_ids}: MachineListProps) {
    return (
        <>
            <List>
                {machine_ids.map((id: string) => {
                    return (
                        <ListItemButton
                            key={id}
                            sx={{border: '1px solid white'}}>
                            <ListItemText primary={id}/>
                        </ListItemButton>)
                })}
            </List>
        </>
    )
}