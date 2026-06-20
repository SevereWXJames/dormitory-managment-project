import dayjs, { type Dayjs } from "dayjs";
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
export type hasEnoughCreditsProps = {
    cost: number,
    balance: number
}
export function hasEnoughCredits({cost,balance}: hasEnoughCreditsProps):boolean{
    return balance - cost >= 0;
}

/*Generated with Claude*/
// reservationUtils.ts
export function hasConflict(newStart: string, machineId: string, bookings: Booking[]): boolean {
    const newStartTime = dayjs(newStart);
    const newEndTime = newStartTime.add(1, "hour");


    return bookings
        .filter(b => b.serviceId === machineId)
        .some(b => {
            const existingStart = dayjs(b.startTime);
            const existingEnd = existingStart.add(1, "hour");

            return newStartTime.isBefore(existingEnd) && newEndTime.isAfter(existingStart);
        });
}