export type SimplifiedMaintenanceStatus = "New" | "In Progress" | "Completed";

const normalizedStatus = (status?: string) => status?.trim().toLowerCase() ?? "";

export function mapBackendStatusToSimplifiedStatus(status?: string): SimplifiedMaintenanceStatus {
    const normalized = normalizedStatus(status);

    if (["done", "completed", "resolved"].includes(normalized)) {
        return "Completed";
    }

    if (["inprogress", "in progress", "investigating", "working", "pending", "scheduled"].includes(normalized)) {
        return "In Progress";
    }

    return "New";
}

export function mapBackendStatusIdToSimplifiedStatusId(statusId?: string): string {
    const normalized = normalizedStatus(statusId);

    if (["done", "completed", "resolved"].includes(normalized)) {
        return "completed";
    }

    if (["inprogress", "investigating", "working", "pending", "scheduled", "in progress"].includes(normalized)) {
        return "inProgress";
    }

    return "new";
}

export const simplifiedStatusGroups = [
    { id: "new", text: "New" },
    { id: "inProgress", text: "In Progress" },
    { id: "completed", text: "Completed" },
];

export function formatSimplifiedStatusValue(status: string | undefined): SimplifiedMaintenanceStatus {
    return mapBackendStatusToSimplifiedStatus(status);
}
