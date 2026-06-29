import { MaintenanceRequest, MaintenanceRequestPriority, MaintenanceRequestStatus, MaintenanceRequestType } from "../dataTypes/maintenanceRequest.ts";
export declare function getAllMaintenanceRequests(): Promise<MaintenanceRequest[]>;
export declare function getAllMaintenanceRequestsByUserId(id: string): Promise<MaintenanceRequest[]>;
export declare function getMaintenanceRequestTypeById(id: string): Promise<MaintenanceRequestType | undefined>;
export declare function getMaintenanceRequestStatusById(id: string): Promise<MaintenanceRequestStatus | undefined>;
export declare function getMaintenanceRequestPriorityById(id: string): Promise<MaintenanceRequestPriority | undefined>;
export declare function getAllMaintenanceRequestTypes(): Promise<MaintenanceRequestType[]>;
export declare function getAllMaintenanceRequestStatuses(): Promise<MaintenanceRequestStatus[]>;
export declare function getAllMaintenanceRequestPriorities(): Promise<MaintenanceRequestPriority[]>;
//# sourceMappingURL=maintenanceRequestServices.d.ts.map