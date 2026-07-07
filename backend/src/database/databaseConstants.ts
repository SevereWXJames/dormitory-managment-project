export const MONGODB_URL_DEFAULT = process.env.MONGODB_URL_DEFAULT;
export const MONGODB_URL_DOCKER = "mongodb://mongo:27017";
export const MONGODB_URL_LOCAL = "mongodb://localhost:27017";
export const DATABASE_NAME = "SmartAPT";

export type CollectionName = "CreditBalances" | "Transactions" | "MaintenanceRequests" | "MaintenanceRequestTypes" |
"MaintenanceRequestStatuses" | "MaintenanceRequestPriorities" | "Notices" | "ReservationSlots" | "Rooms" |
"Residents" | "Services" | "Users";

