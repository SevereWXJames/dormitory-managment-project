import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import type  { SelectChangeEvent } from '@mui/material/Select';

export type MachineOption = {
    machine_id : string,
    machine_name : string
}

export type DropDownMenuProps = {
    machineOptions : MachineOption[];
}

export default function MachineMenu() {
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Machine Options"
                    onChange={handleChange}
                >
                    <MenuItem value={"machine_1"}>Machine 1</MenuItem>
                    <MenuItem value={"machine_2"}>Machine 2</MenuItem>
                    <MenuItem value={"machine_3"}>Machine 3</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
