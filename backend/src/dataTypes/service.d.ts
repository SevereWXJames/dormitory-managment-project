export declare class Service {
    id: string;
    name: string;
    description: string;
    hasIoT: boolean;
    IoTName: string | null;
    reservationDurationSeconds: number;
    reservationStartHour: number;
    reservationEndHour: number;
    constructor({ id, name, description, hasIoT, IoTName, reservationDurationSeconds, reservationStartHour, reservationEndHour }: {
        id: string;
        name: string;
        description: string;
        hasIoT: boolean;
        IoTName: string | null;
        reservationDurationSeconds: number;
        reservationStartHour: number;
        reservationEndHour: number;
    });
}
//# sourceMappingURL=service.d.ts.map