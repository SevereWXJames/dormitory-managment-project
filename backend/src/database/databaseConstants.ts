export const MONGODB_URL_DEFAULT = process.env.MONGODB_URL_DEFAULT;
export const MONGODB_URL_DOCKER = "mongodb://mongo:27017";
export const MONGODB_URL_LOCAL = "mongodb://localhost:27017";
export const DATABASE_NAME = "SmartAPT";

export type CollectionName = "credit_balances" | "transactions" | "maintenance_requests" | "maintenance_request_types" |
"maintenance_request_statuses" | "maintenance_request_priorities" | "notices" | "reservation_slots" | "rooms" |
"residents" | "services" | "users";

