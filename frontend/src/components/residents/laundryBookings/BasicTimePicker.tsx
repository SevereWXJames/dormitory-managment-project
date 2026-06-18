import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export type BasicTimePickerProps = {
    label: string
}

export default function BasicTimePicker({label}: BasicTimePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker label={label} slotProps={{
                    textField: {
                        required: true,
                    }}}/>
            </DemoContainer>
        </LocalizationProvider>
    );
}
