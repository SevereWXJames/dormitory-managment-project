// useReservationForm.ts
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { Dayjs } from "dayjs";
import type { SelectChangeEvent } from "@mui/material/Select";
import { addBooking } from "../../../../context/residents/bookingsSlice";
import { createBooking } from "./reservationUtils";

export function useReservationForm() {
    const [eventName, setEventName] = useState("");
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [machine, setMachine] = useState("");

    const dispatch = useDispatch();

    const handleMachineChange = (event: SelectChangeEvent) => {
        setMachine(event.target.value as string);
    };

    const handleSubmit = () => {
        const booking = createBooking({ machine, startTime });
        dispatch(addBooking(booking));
    };

    return {
        eventName, setEventName,
        startTime, setStartTime,
        machine,
        handleMachineChange,
        handleSubmit,
    };
}