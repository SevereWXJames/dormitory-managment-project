
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {type SelectChangeEvent} from '@mui/material/Select';

export type MachineOption = {
    machine_id : string,
    machine_name : string
}

export type DropDownMenuProps = {
    machineOptions : MachineOption[];
}

export type MachineMenuProps = {
    machine: string;
    handleChange: (event:SelectChangeEvent) => void;
}

export default function MachineMenu({machine, handleChange}: MachineMenuProps) {
    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label"
                            sx={{ color: 'white' }}>Select Machine</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    required
                    value={machine}
                    label="Machine Options"
                    onChange={handleChange}
                    sx={{
                        color: 'white',
                    }}
                >
                    <MenuItem value={"machine_1"}>Machine 1</MenuItem>
                    <MenuItem value={"machine_2"}>Machine 2</MenuItem>
                    <MenuItem value={"machine_3"}>Machine 3</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
