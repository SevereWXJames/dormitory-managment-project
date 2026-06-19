// useReservationForm.ts
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import type { Dayjs } from "dayjs";
import type { SelectChangeEvent } from "@mui/material/Select";
import { addBooking } from "../../../../context/residents/bookingsSlice";
import { createBooking } from "./reservationUtils";
import {getUsername} from "../../../../context/authenticationSlice.ts";

export function useReservationForm() {
    const [eventName, setEventName] = useState("");
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [machine, setMachine] = useState("");
    const [date, setDate] = useState<Dayjs | null>(null);
    const userId = useSelector(getUsername);

    const dispatch = useDispatch();

    const handleMachineChange = (event: SelectChangeEvent) => {
        setMachine(event.target.value as string);
    };

    const handleSubmit = () => {
        const booking = createBooking({ machine,eventName, startTime, date, userId});
        dispatch(addBooking(booking));
    };

    return {
        eventName, setEventName,
        startTime, setStartTime,
        date, setDate,
        machine,
        userId,
        handleMachineChange,
        handleSubmit,
    };
}