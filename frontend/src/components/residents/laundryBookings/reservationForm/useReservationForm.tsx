// useReservationForm.ts
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import type { Dayjs } from "dayjs";
import type { SelectChangeEvent } from "@mui/material/Select";
import {addBooking, getAllBookings} from "../../../../context/residents/bookingsSlice";
import {createBooking, hasConflict, hasEnoughCredits} from "./reservationUtils";
import {getUserId} from "../../../../context/authenticationSlice.ts";
import {getCreditsCents, removeCredits} from "../../../../context/residents/creditsSlice";
import type {Booking} from "../../../../types/residents/types.tsx";

export function useReservationForm() {
    const [eventName, setEventName] = useState("");
    const [startTime, setStartTime] = useState<Dayjs | null>(null);
    const [machine, setMachine] = useState("");
    const [date, setDate] = useState<Dayjs | null>(null);
    const userId = useSelector(getUserId);

    const dispatch = useDispatch();
    const bookings: Booking[] = useSelector(getAllBookings);
    const balance = useSelector(getCreditsCents);

    const handleMachineChange = (event: SelectChangeEvent) => {
        setMachine(event.target.value as string);
    };

    const handleSubmit = () => {
        if (!startTime || !date || eventName === "" || machine === "") return;  // guard here
        const isoStart = startTime.toISOString();

        if (hasConflict(isoStart, machine, bookings)) {
            alert("This time slot is already booked for this machine.");
            return;
        }

        const cost: number = 100;
        if(!hasEnoughCredits({balance, cost})){
            alert("You do not have enough credits");
            return;
        }

        const booking = createBooking({ machine,eventName, startTime, date, userId});
        dispatch(addBooking(booking));
        dispatch(removeCredits(cost));
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