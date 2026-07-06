import {Types} from "mongoose";

export const Role = {
    RESIDENT: "RESIDENT",
    ADMIN: "ADMIN",
    STAFF: "STAFF"
} as const;

export type Role = typeof Role[keyof typeof Role];

export type SignUpRequest = {
    name: string,
    username: string,
    email: string,
    phoneNumber: string,
    password: string,
    roles: Role,
}