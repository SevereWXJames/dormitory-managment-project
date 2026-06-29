export declare class MaintenanceRequest {
    id: string;
    createdBy: string;
    title: string;
    description: string;
    type: string;
    status: string;
    priority: string;
    location: string | null;
    constructor({ id, createdBy, title, description, type, status, priority, location }: {
        id: string;
        createdBy: string;
        title: string;
        description: string;
        type: string;
        status: string;
        priority: string;
        location: string | null;
    });
}
export declare class MaintenanceRequestType {
    id: string;
    text: string;
    constructor({ id, text }: {
        id: string;
        text: string;
    });
}
export declare class MaintenanceRequestStatus {
    id: string;
    text: string;
    constructor({ id, text }: {
        id: string;
        text: string;
    });
}
export declare class MaintenanceRequestPriority {
    id: string;
    text: string;
    constructor({ id, text }: {
        id: string;
        text: string;
    });
}
//# sourceMappingURL=maintenanceRequest.d.ts.map