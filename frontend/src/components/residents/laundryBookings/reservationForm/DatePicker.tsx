import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import type {Dayjs} from "dayjs";

export type BasicTimePickerProps = {
    onChange: (value: Dayjs | null) => void
}

export default function BasicDatePicker({onChange}: BasicTimePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Basic date picker"
                        onChange={onChange}
                        disablePast
                        slotProps={{textField: {required: true}}}/>
        </LocalizationProvider>
    );
}
