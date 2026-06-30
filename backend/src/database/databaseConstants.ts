// The MongoDB_URl variable is set based on an environment variable of the same
// name. Refer to database.md for details and troubleshooting information.
export const MONGODB_URL = (process.env.MONGODB_URL == null) ? "mongodb://mongo:27017" : process.env.MONGODB_URL;
export const DATABASE_NAME = "SmartAPT";

export type CollectionName = "credit_balances" | "transactions" | "maintenance_requests" | "maintenance_request_types" |
"maintenance_request_statuses" | "maintenance_request_priorities" | "notices" | "reservation_slots" | "rooms" |
"residents" | "services";

