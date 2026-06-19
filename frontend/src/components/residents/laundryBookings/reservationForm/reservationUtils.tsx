import type { Dayjs } from "dayjs";
import type {Booking} from "../../../../types/residents/types.tsx";

interface CreateBookingParams {
    machine: string;
    eventName: string;
    startTime: Dayjs | null;
    date: Dayjs | null;
    userId: string;
}

export function createBooking({ machine, eventName, startTime, date, userId }: CreateBookingParams): Booking {
    return {
        _id: crypto.randomUUID(),
        eventName: eventName,
        serviceId: machine,
        booked: true,
        bookedBy: userId, // replace with auth context later
        startTime: startTime?.toISOString() ?? "",
        date: date?.toISOString() ?? ""
    };
}