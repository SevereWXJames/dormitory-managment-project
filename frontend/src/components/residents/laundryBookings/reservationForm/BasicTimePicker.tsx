import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import type {Dayjs} from "dayjs";

export type BasicTimePickerProps = {
    label: string
    onChange: (value: Dayjs | null)=>void
}

export default function BasicTimePicker({label, onChange}: BasicTimePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker label={label}
                            slotProps={{textField: {required: true,}}}
                            sx={{'& .MuiInputLabel-root': {color: 'white'},
                                '& .MuiPickersInputBase-colorPrimary': {color: 'white'},
                                '& .MuiButtonBase-root': {color: 'white'}}}
                onChange={onChange}/>
            </DemoContainer>
        </LocalizationProvider>
    );
}
