export declare class ReservationSlot {
    id: string;
    serviceId: string;
    booked: boolean;
    bookedBy: string | null;
    startTime: number;
    durationSeconds: number;
    constructor({ id, serviceId, booked, bookedBy, time, durationSeconds }: {
        id: string;
        serviceId: string;
        booked: boolean;
        bookedBy: string | null;
        time: number;
        durationSeconds: number;
    });
}
//# sourceMappingURL=reservationSlot.d.ts.map