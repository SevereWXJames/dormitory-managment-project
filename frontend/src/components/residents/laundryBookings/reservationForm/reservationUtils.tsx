import type { Dayjs } from "dayjs";
import type {Booking} from "../../../../types/residents/types.tsx";

interface CreateBookingParams {
    machine: string;
    startTime: Dayjs | null;
    date: Dayjs | null;
    user_id: string;
}

export function createBooking({ machine, startTime, date, user_id }: CreateBookingParams): Booking {
    return {
        _id: crypto.randomUUID(),
        serviceId: machine,
        booked: true,
        bookedBy: user_id, // replace with auth context later
        startTime,
        date
    };
}