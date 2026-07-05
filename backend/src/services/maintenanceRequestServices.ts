import {
    MaintenanceRequest,
    MaintenanceRequestPriority,
    MaintenanceRequestStatus,
    MaintenanceRequestType
} from "../dataTypes/maintenanceRequest.ts";
import MaintenanceRequestTypeModel from "../database/models/maintenanceRequestType.model.ts";
import MaintenanceRequestPriorityModel from "../database/models/maintenanceRequestPriority.model.ts";
import MaintenanceRequestStatusModel from "../database/models/maintenanceRequestStatus.model.ts";
import MaintenanceRequestModel from "../database/models/maintenanceRequest.model.ts";

export async function getAllMaintenanceRequests(): Promise<MaintenanceRequest[]> {
    const cursor = MaintenanceRequestModel.find({ }).lean();
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
    const cursor = MaintenanceRequestModel.find({createdBy: userId}).lean();
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
    return MaintenanceRequestTypeModel.findOne({_id: _id}).lean().exec()
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
    return MaintenanceRequestStatusModel.findOne({_id: _id}).lean().exec()
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
    return MaintenanceRequestPriorityModel.findOne({_id: _id}).lean().exec()
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
    const cursor = MaintenanceRequestTypeModel.find({ }).lean();
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
    const cursor = MaintenanceRequestStatusModel.find({ }).lean();
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
    const cursor = MaintenanceRequestPriorityModel.find({ }).lean();
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