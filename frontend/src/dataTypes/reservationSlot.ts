export class ReservationSlot {
    public _id: string;
    public serviceId: string;
    public booked: boolean;
    public bookedBy: string | null;
    public bookedByName?: string | null;
    public startTime: Date;
    public startTimeString?: string | null;
    public serviceName?: string | null;
    public durationSeconds: number;

    constructor({_id, serviceId, booked, bookedBy, time, durationSeconds}: {_id: string, serviceId: string, booked: boolean, bookedBy: string | null, time: Date, durationSeconds: number}) {
        this._id = _id;
        this.serviceId = serviceId;
        this.booked = booked;
        this.bookedBy = bookedBy;
        this.startTime = time;
        this.durationSeconds = durationSeconds;
        this.startTimeString = null;
        this.serviceName = null;

    }
}