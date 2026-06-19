import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import type {Dayjs} from "dayjs";
import dayjs from "dayjs";

export type BasicTimePickerProps = {
    label: string
    onChange: (value: Dayjs | null)=>void
}

export default function BasicTimePicker({label, onChange}: BasicTimePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label={label}
                            minTime={dayjs().hour(7).minute(0)}
                            maxTime={dayjs().hour(18).minute(0)}
                            slotProps={{textField: {required: true,}}}
                            sx={{'& .MuiInputLabel-root': {color: 'white'},
                                '& .MuiPickersInputBase-colorPrimary': {color: 'white'},
                                '& .MuiButtonBase-root': {color: 'white'}}}
                onChange={onChange}/>
        </LocalizationProvider>
    );
}
