import roomJSON from "../../test_data/rooms.json" with {type: "json"};
import residentJSON from "../../test_data/residents.json" with {type: "json"};
import type {Room} from "../dataTypes/room.ts";
import type {Resident} from "../dataTypes/user.ts";

export async function getAllRooms(): Promise<Room[]> {
    return roomJSON.rooms as Room[];
}

export async function getRoomById(_id: string): Promise<Room> {
    const testRoom = roomJSON.rooms.find((room) => {
        return room._id === _id;
    });
    return testRoom as Room;
}

export async function getRoomByUserId(_id: string): Promise<Room> {
    const resident = await getResidentByUserId(_id);
    const testRoom = roomJSON.rooms.find((room) => {
        return room._id === resident.roomId;
    });
    return testRoom as Room;
}

export async function getAllResidents(): Promise<Resident[]> {
    return residentJSON.residents as Resident[];
}

export async function getResidentByUserId(_id: string): Promise<Resident> {
    const testResident = residentJSON.residents.find((resident) => {
        return resident.userId === _id;
    });
    return testResident as Resident;
}
