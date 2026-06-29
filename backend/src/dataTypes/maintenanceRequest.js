export class MaintenanceRequest {
    id;
    createdBy;
    title;
    description;
    type;
    status;
    priority;
    location;
    constructor({ id, createdBy, title, description, type, status, priority, location }) {
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
    id;
    text;
    constructor({ id, text }) {
        this.id = id;
        this.text = text;
    }
}
export class MaintenanceRequestStatus {
    id;
    text;
    constructor({ id, text }) {
        this.id = id;
        this.text = text;
    }
}
export class MaintenanceRequestPriority {
    id;
    text;
    constructor({ id, text }) {
        this.id = id;
        this.text = text;
    }
}
//# sourceMappingURL=maintenanceRequest.js.map