import type { Room } from "../dataTypes/room.ts";
import type { Resident } from "../dataTypes/user.ts";
export declare function getAllRooms(): Promise<Room[]>;
export declare function getRoomById(id: string): Promise<Room>;
export declare function getRoomByUserId(id: string): Promise<Room>;
export declare function getAllResidents(): Promise<Resident[]>;
export declare function getResidentByUserId(id: string): Promise<Resident>;
//# sourceMappingURL=roomServices.d.ts.map