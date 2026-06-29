import requestJSON from "../../test_data/maintenanceRequest.json" with { type: "json" };
import requestTypeJSON from "../../test_data/maintenanceRequestType.json" with { type: "json" };
import requestStatusJSON from "../../test_data/maintenanceRequestStatus.json" with { type: "json" };
import requestPriorityJSON from "../../test_data/maintenanceRequestPriority.json" with { type: "json" };
import { MaintenanceRequest, MaintenanceRequestPriority, MaintenanceRequestStatus, MaintenanceRequestType } from "../dataTypes/maintenanceRequest.ts";
export async function getAllMaintenanceRequests() {
    return requestJSON.maintenanceRequests;
}
export async function getAllMaintenanceRequestsByUserId(id) {
    return requestJSON.maintenanceRequests.filter((maintenanceRequest) => {
        return maintenanceRequest.createdBy === id;
    });
}
export async function getMaintenanceRequestTypeById(id) {
    const testType = requestTypeJSON.maintenanceRequestTypes.find((request) => {
        return request._id === id;
    });
    return testType;
}
export async function getMaintenanceRequestStatusById(id) {
    const testStatus = requestStatusJSON.maintenanceRequestStatuses.find((request) => {
        return request._id === id;
    });
    return testStatus;
}
export async function getMaintenanceRequestPriorityById(id) {
    const testPriority = requestPriorityJSON.maintenanceRequestPriorities.find((priority) => {
        return priority._id === id;
    });
    return testPriority;
}
export async function getAllMaintenanceRequestTypes() {
    return requestTypeJSON.maintenanceRequestTypes;
}
export async function getAllMaintenanceRequestStatuses() {
    return requestStatusJSON.maintenanceRequestStatuses;
}
export async function getAllMaintenanceRequestPriorities() {
    return requestPriorityJSON.maintenanceRequestPriorities;
}
//# sourceMappingURL=maintenanceRequestServices.js.map