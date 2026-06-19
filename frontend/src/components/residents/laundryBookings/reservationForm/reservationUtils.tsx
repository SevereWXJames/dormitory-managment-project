import type { Dayjs } from "dayjs";
import type {Booking} from "../../../../types/residents/types.tsx";

interface CreateBookingParams {
    machine: string;
    eventName: string;
    startTime: Dayjs | null;
    date: Dayjs | null;
    user_id: string;
}

export function createBooking({ machine, eventName, startTime, date, user_id }: CreateBookingParams): Booking {
    return {
        _id: crypto.randomUUID(),
        eventName: eventName,
        serviceId: machine,
        booked: true,
        bookedBy: user_id, // replace with auth context later
        startTime,
        date
    };
}