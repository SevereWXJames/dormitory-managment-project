import requestJSON from "../../test_data/maintenanceRequest.json" with {type: "json"};
import requestTypeJSON from "../../test_data/maintenanceRequestType.json" with {type: "json"};
import requestStatusJSON from "../../test_data/maintenanceRequestStatus.json" with {type: "json"};
import requestPriorityJSON from "../../test_data/maintenanceRequestPriority.json" with {type: "json"};
import {
    MaintenanceRequest,
    MaintenanceRequestPriority,
    MaintenanceRequestStatus,
    MaintenanceRequestType
} from "../dataTypes/maintenanceRequest.ts";

export async function getAllMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    return requestJSON.maintenanceRequests as MaintenanceRequest[];
}

export async function getAllMaintenanceRequestsByUserId(id: string): Promise<MaintenanceRequest[]> {
    return requestJSON.maintenanceRequests.filter((maintenanceRequest) => {
        return maintenanceRequest.createdBy === id;
    }) as MaintenanceRequest[];
}

export async function getMaintenanceRequestTypeById(id: string): Promise<MaintenanceRequestType | undefined> {
    const testType = requestTypeJSON.maintenanceRequestTypes.find((request) => {
        return request._id === id;
    });
    return testType as MaintenanceRequestType;
}

export async function getMaintenanceRequestStatusById(id: string): Promise<MaintenanceRequestStatus | undefined> {
    const testStatus = requestStatusJSON.maintenanceRequestStatuses.find((request) => {
        return request._id === id;
    });
    return testStatus as MaintenanceRequestStatus;
}

export async function getMaintenanceRequestPriorityById(id: string): Promise<MaintenanceRequestPriority | undefined> {
    const testPriority = requestPriorityJSON.maintenanceRequestPriorities.find((priority) => {
        return priority._id === id;
    });
    return testPriority as MaintenanceRequestPriority;
}

export async function getAllMaintenanceRequestTypes(): Promise<MaintenanceRequestType[]> {
    return requestTypeJSON.maintenanceRequestTypes as MaintenanceRequestType[];
}

export async function getAllMaintenanceRequestStatuses(): Promise<MaintenanceRequestStatus[]> {
    return requestStatusJSON.maintenanceRequestStatuses as MaintenanceRequestStatus[];
}

export async function getAllMaintenanceRequestPriorities(): Promise<MaintenanceRequestPriority[]> {
    return requestPriorityJSON.maintenanceRequestPriorities as MaintenanceRequestPriority[];
}