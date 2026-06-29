export class Service {
    id;
    name;
    description;
    hasIoT;
    IoTName;
    reservationDurationSeconds;
    reservationStartHour;
    reservationEndHour;
    constructor({ id, name, description, hasIoT, IoTName, reservationDurationSeconds, reservationStartHour, reservationEndHour }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.hasIoT = hasIoT;
        this.IoTName = IoTName;
        this.reservationDurationSeconds = reservationDurationSeconds;
        this.reservationStartHour = reservationStartHour;
        this.reservationEndHour = reservationEndHour;
    }
}
//# sourceMappingURL=service.js.map