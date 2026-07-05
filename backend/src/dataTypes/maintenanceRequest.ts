import type { CollectionName } from "../database/databaseConstants.ts";

export class MaintenanceRequest {
    public _id: string;
    public createdBy: string;
    public title: string;
    public description: string;
    public type: string;
    public status: string;
    public priority: string;
    public location: string | null;

    constructor({_id, createdBy, title, description, type, status, priority, location}: {
        _id: string,
        createdBy: string,
        title: string,
        description: string,
        type: string,
        status: string,
        priority: string,
        location: string | null
    }) {
        this._id = _id;
        this.createdBy = createdBy;
        this.title = title;
        this.description = description;
        this.type = type;
        this.status = status;
        this.priority = priority;
        this.location = location;
    }
}

export class MaintenanceRequestType {
    public _id: string;
    public text: string;

    constructor({_id, text}: {_id: string, text: string}) {
        this._id = _id;
        this.text = text;
    }
}

export class MaintenanceRequestStatus {
    public _id: string;
    public text: string;

    constructor({_id, text}: {_id: string, text: string}) {
        this._id = _id;
        this.text = text;
    }
}

export class MaintenanceRequestPriority {
    public _id: string;
    public text: string;

    constructor({_id, text}: {_id: string, text: string}) {
        this._id = _id;
        this.text = text;
    }
}