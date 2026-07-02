export type CommonFrameType = "UNAUTHENTICATED" | "LOGIN" | "RESIDENT" | "BUILDING_MANAGER";
export type AuthenticationState = "UNAUTHENTICATED" | "RESIDENT" | "BUILDING_MANAGER";
export type MaintenanceRequestStatus = "NEW" | "SCHEDULED" | "RESOLVED";
export type MaintenanceRequestPriority = "HIGH" | "MEDIUM" | "LOW";

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

export type MaintenanceRequestState = {
    id: string | number,
    unit: string,
    priority: MaintenanceRequestPriority,
    status: MaintenanceRequestStatus,
    issue: string,
    location: string,
    description: string
}