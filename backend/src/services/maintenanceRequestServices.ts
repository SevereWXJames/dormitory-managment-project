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
    const cursor = MaintenanceRequest.model.find({ }).lean();
    const results: MaintenanceRequest[] = [];

    for await (const result of cursor) {
        try {
            if (result != null) {
                results.push(result as MaintenanceRequest);
            }
        } catch (e) {
            // "Pass"
        }
    }

    return Promise.resolve(results);
}

export async function getAllMaintenanceRequestsByUserId(userId: string): Promise<MaintenanceRequest[]> {
    const cursor = MaintenanceRequest.model.find({createdBy: userId}).lean();
    const results: MaintenanceRequest[] = [];

    for await (const result of cursor) {
        try {
            if (result != null) {
                results.push(result as MaintenanceRequest);
            }
        } catch (e) {
            // "Pass"
        }
    }

    return Promise.resolve(results);
}

export async function getMaintenanceRequestTypeById(_id: string): Promise<MaintenanceRequestType | undefined> {
    return MaintenanceRequestType.model.findOne({_id: _id}).lean().exec()
        .then((result) => {
            if (result != null) {
                return Promise.resolve(result as MaintenanceRequestType);
            }
            return Promise.resolve(undefined);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}

export async function getMaintenanceRequestStatusById(_id: string): Promise<MaintenanceRequestStatus | undefined> {
    return MaintenanceRequestStatus.model.findOne({_id: _id}).lean().exec()
        .then((result) => {
            if (result != null) {
                return Promise.resolve(result as MaintenanceRequestStatus);
            }
            return Promise.resolve(undefined);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}

export async function getMaintenanceRequestPriorityById(_id: string): Promise<MaintenanceRequestPriority | undefined> {
    return MaintenanceRequestPriority.model.findOne({_id: _id}).lean().exec()
        .then((result) => {
            if (result != null) {
                return Promise.resolve(result as MaintenanceRequestPriority);
            }
            return Promise.resolve(undefined);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}

export async function getAllMaintenanceRequestTypes(): Promise<MaintenanceRequestType[]> {
    const cursor = MaintenanceRequestType.model.find({ }).lean();
    const results: MaintenanceRequestType[] = [];

    for await (const result of cursor) {
        try {
            if (result != null) {
                results.push(result as MaintenanceRequestType);
            }
        } catch (e) {
            // "Pass"
        }
    }

    return Promise.resolve(results);
}

export async function getAllMaintenanceRequestStatuses(): Promise<MaintenanceRequestStatus[]> {
    const cursor = MaintenanceRequestStatus.model.find({ }).lean();
    const results: MaintenanceRequestStatus[] = [];

    for await (const result of cursor) {
        try {
            if (result != null) {
                results.push(result as MaintenanceRequestStatus);
            }
        } catch (e) {
            // "Pass"
        }
    }

    return Promise.resolve(results);
}

export async function getAllMaintenanceRequestPriorities(): Promise<MaintenanceRequestPriority[]> {
    const cursor = MaintenanceRequestPriority.model.find({ }).lean();
    const results: MaintenanceRequestPriority[] = [];

    for await (const result of cursor) {
        try {
            if (result != null) {
                results.push(result as MaintenanceRequestPriority);
            }
        } catch (e) {
            // "Pass"
        }
    }

    return Promise.resolve(results);
}