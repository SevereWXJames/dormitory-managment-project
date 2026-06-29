export class MaintenanceRequest {
    public id: string;
    public createdBy: string;
    public title: string;
    public description: string;
    public type: string;
    public status: string;
    public priority: string;
    public location: string | null;

    constructor({id, createdBy, title, description, type, status, priority, location}: {
        id: string,
        createdBy: string,
        title: string,
        description: string,
        type: string,
        status: string,
        priority: string,
        location: string | null
    }) {
        this.id = id;
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
    public id: string;
    public text: string;

    constructor({id, text}: {id: string, text: string}) {
        this.id = id;
        this.text = text;
    }
}

export class MaintenanceRequestStatus {
    public id: string;
    public text: string;

    constructor({id, text}: {id: string, text: string}) {
        this.id = id;
        this.text = text;
    }
}

export class MaintenanceRequestPriority {
    public id: string;
    public text: string;

    constructor({id, text}: {id: string, text: string}) {
        this.id = id;
        this.text = text;
    }
}