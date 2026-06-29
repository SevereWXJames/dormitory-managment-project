export class ReservationSlot {
    id;
    serviceId;
    booked;
    bookedBy;
    startTime;
    durationSeconds;
    constructor({ id, serviceId, booked, bookedBy, time, durationSeconds }) {
        this.id = id;
        this.serviceId = serviceId;
        this.booked = booked;
        this.bookedBy = bookedBy;
        this.startTime = time;
        this.durationSeconds = durationSeconds;
    }
}
//# sourceMappingURL=reservationSlot.js.map