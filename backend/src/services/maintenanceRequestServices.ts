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

/**
 * Adds the provided maintenance request to the database.
 * 
 * @param maintenanceRequest Maintenance request to be added to the database.
 * @returns Promise indicating whether the maintenance request was added
 * successfully.
 */
export async function addMaintenanceRequest(maintenanceRequest: MaintenanceRequest) : Promise<void> {
    return Promise.reject(new Error("Not implemented."));
} 

/**
 * Sets all fields of the maintenance request with the provided _id to have
 * the provided values, except for the _id itself.
 * 
 * @param _id _id value of the maintenance request to be edited.
 * @param maintenanceRequest A maintenance request with the desired new values.
 * @returns Promise indicating whether the maintenance request was set
 * successfully.
 */
export async function setMaintenanceRequest(_id: string, maintenanceRequest: MaintenanceRequest) : Promise<void> {
    return Promise.reject(new Error("Not implemented."));
} 

/**
 * Sets the priority of the maintenance request with the provided _id.
 * 
 * @param _id _id value of the maintenance request to be edited.
 * @param maintenanceRequestPriority New priority value to be set.
 * @returns Promise indicating whether the maintenance request was set
 * successfully.
 */
export async function setMaintenanceRequestPriority(_id: string, maintenanceRequestPriority: MaintenanceRequestPriority) : Promise<void> {
    return Promise.reject(new Error("Not implemented."));
} 

/**
 * Sets the status of the maintenance request with the provided _id.
 * 
 * @param _id _id value of the maintenance request to be edited.
 * @param maintenanceRequestStatus New status value to be set.
 * @returns Promise indicating whether the maintenance request was set
 * successfully.
 */
export async function setMaintenanceRequestStatus(_id: string, maintenanceRequestStatus: MaintenanceRequestStatus) : Promise<void> {
    return Promise.reject(new Error("Not implemented."));
} 