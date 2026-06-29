export class ReservationSlot {
    public id: string;
    public serviceId: string;
    public booked: boolean;
    public bookedBy: string | null;
    public startTime: number;
    public durationSeconds: number;

    constructor({id, serviceId, booked, bookedBy, time, durationSeconds}: {id: string, serviceId: string, booked: boolean, bookedBy: string | null, time: number, durationSeconds: number}) {
        this.id = id;
        this.serviceId = serviceId;
        this.booked = booked;
        this.bookedBy = bookedBy;
        this.startTime = time;
        this.durationSeconds = durationSeconds;
    }
}