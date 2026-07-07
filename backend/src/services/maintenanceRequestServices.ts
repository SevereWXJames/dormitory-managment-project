import type { Model, Document } from "mongoose";
import {
    type MaintenanceRequest, MaintenanceRequestModel,
    type MaintenanceRequestPriority, MaintenanceRequestPriorityModel,
    type MaintenanceRequestStatus, MaintenanceRequestStatusModel,
    type MaintenanceRequestType, MaintenanceRequestTypeModel
} from "../dataTypes/maintenanceRequest.ts";

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

/**
 * Adds the provided maintenance request to the database.
 * 
 * @param maintenanceRequest Maintenance request to be added to the database.
 * @returns Promise indicating whether the maintenance request was added
 * successfully.
 */
export async function addMaintenanceRequest(maintenanceRequest: MaintenanceRequest) : Promise<void> {
    return MaintenanceRequestModel.insertOne(maintenanceRequest).then((result) => {
        return Promise.resolve();
    }).catch((e) => {
        return Promise.reject(e);
    });
} 

/**
 * Sets all fields of the maintenance request according to the provided values.
 * 
 * @param _id _id value of the maintenance request to be edited.
 * @param updateFields The provided new values to be set. This must be a subset
 * of the MaintenanceRequest fields.
 * @returns Promise indicating whether the maintenance request was set
 * successfully.
 */
async function setMaintenanceRequestFields(_id: string, updateFields: any): Promise<void> {
    return MaintenanceRequestModel.updateOne({_id: _id}, {$set: updateFields}).then((result) => {
        return Promise.resolve();
    }).catch((e) => {
        return Promise.reject();
    });
}

/**
 * Sets all fields of the maintenance request with the provided _id to have
 * the provided values, except for _id itself.
 * 
 * @param _id _id value of the maintenance request to be edited.
 * @param maintenanceRequest A maintenance request with the desired new values.
 * @returns Promise indicating whether the maintenance request was set
 * successfully.
 */
export async function setMaintenanceRequest(_id: string, maintenanceRequest: MaintenanceRequest) : Promise<void> {
    if (_id != maintenanceRequest._id) {
        return Promise.reject(new Error("The passed _id and the _id in the maintenanceRequest are different."));
    }

    return setMaintenanceRequestFields(_id, maintenanceRequest);
} 

/**
 * Sets the status of the maintenance request with the provided _id.
 * 
 * @param _id _id value of the maintenance request to be edited.
 * @param statusId _id of the new status value to be set.
 * @returns Promise indicating whether the maintenance request was set
 * successfully.
 */
export async function setMaintenanceRequestStatus(_id: string, statusId: string) : Promise<void> {
    await getAllMaintenanceRequestStatuses().then((result) => {
        if (result.find((status) => status._id === statusId) === undefined) {
            return Promise.reject(new Error("Status not available in the database."));
        }
    });

    return setMaintenanceRequestFields(_id, {status: statusId});
} 

/**
 * Sets the priority of the maintenance request with the provided _id.
 * 
 * @param _id _id value of the maintenance request to be edited.
 * @param priorityId _id of the new  priority value to be set.
 * @returns Promise indicating whether the maintenance request was set
 * successfully.
 */
export async function setMaintenanceRequestPriority(_id: string, priorityId: string) : Promise<void> {
    await getAllMaintenanceRequestPriorities().then((result) => {
        if (result.find((priority) => priority._id === priorityId) === undefined) {
            return Promise.reject(new Error("Priority not available in the database."));
        }
    });
    return setMaintenanceRequestFields(_id, {priority: priorityId});
} 