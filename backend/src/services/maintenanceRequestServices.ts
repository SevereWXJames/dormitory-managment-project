import requestJSON from "../../test_data/maintenanceRequest.json" with {type: "json"};
import requestTypeJSON from "../../test_data/maintenanceRequestType.json" with {type: "json"};
import requestStatusJSON from "../../test_data/maintenanceRequestStatus.json" with {type: "json"};
import {MaintenanceRequest, MaintenanceRequestStatus, MaintenanceRequestType} from "../dataTypes/maintenanceRequest.ts";

export async function getAllMaintenanceRequests(): Promise<[MaintenanceRequest]> {
    return requestJSON.maintenanceRequests as [MaintenanceRequest];
}

export async function getAllMaintenanceRequestsByUserId(id: string): Promise<[MaintenanceRequest]> {
    return requestJSON.maintenanceRequests.filter((maintenanceRequest) => {
        return maintenanceRequest.createdBy === id;
    }) as [MaintenanceRequest];
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