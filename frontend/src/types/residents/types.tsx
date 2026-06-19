import type {Dayjs} from "dayjs";

export type Booking = {
    _id: string;
    eventName: string,
    serviceId: string;
    booked: boolean;
    bookedBy: string | null;
    startTime: Dayjs | null;
    date :Dayjs | null;
    durationSeconds?: number;
}