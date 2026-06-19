import type { Dayjs } from "dayjs";
import type { Booking } from "../../../../context/residents/bookingsSlice.ts";

interface CreateBookingParams {
    machine: string;
    startTime: Dayjs | null;
}

export function createBooking({ machine, startTime }: CreateBookingParams): Booking {
    return {
        _id: crypto.randomUUID(),
        serviceId: machine,
        booked: true,
        bookedBy: "user_id_1", // replace with auth context later
        startTime,
    };
}