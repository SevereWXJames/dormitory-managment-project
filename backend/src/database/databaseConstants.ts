// Set to mongodb://mongodb:27017 when running in docker
// Set to mongodb://localhost:27017 when running locally.
export const MONGODB_URL = "mongodb://mongodb:27017";
export const DATABASE_NAME = "SmartAPT";

export type CollectionName = "facilities" | "bookings" | "maintenance_requests" | "notices" | "credits" | "units" | "users" ;