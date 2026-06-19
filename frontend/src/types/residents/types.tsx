export type Booking = {
    _id: string;
    eventName: string,
    serviceId: string;
    booked: boolean;
    bookedBy: string | null;
    startTime: string | null;
    date :string | null;
    durationSeconds?: number;
}