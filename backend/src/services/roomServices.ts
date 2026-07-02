import roomJSON from "../../test_data/rooms.json" with {type: "json"};
import residentJSON from "../../test_data/residents.json" with {type: "json"};
import {Room} from "../dataTypes/room.ts";
import {Resident} from "../dataTypes/user.ts";

export async function getAllRooms(): Promise<Room[]> {
    const cursor = Room.model.find({ }).lean();
    const results: Room[] = [];

    for await (const result of cursor) {
        try {
            if (result != null) {
                results.push(result as Room);
            }
        } catch (e) {
            // "Pass"
        }
    }

    return Promise.resolve(results);
}

export async function getRoomById(_id: string): Promise<Room | undefined> {
    return Room.model.findOne({_id: _id}).lean().exec()
        .then((result) => {
            if (result != null) {
                return Promise.resolve(result as Room);
            }
            return Promise.resolve(undefined);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}

export async function getRoomByUserId(_id: string): Promise<Room | undefined> {
    const resident = await getResidentByUserId(_id);
    
    if (resident === undefined) {
        return Promise.resolve(undefined);
    }

    return Room.model.findOne({_id: resident.roomId}).lean().exec()
        .then((result) => {
            if (result != null) {
                return Promise.resolve(result as Room);
            }
            return Promise.resolve(undefined);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}

export async function getAllResidents(): Promise<Resident[]> {
    const cursor = Resident.model.find({ }).lean();
    const results: Resident[] = [];

    for await (const result of cursor) {
        try {
            if (result != null) {
                results.push(result as Resident);
            }
        } catch (e) {
            // "Pass"
        }
    }

    return Promise.resolve(results);
}

export async function getResidentByUserId(userId: string): Promise<Resident | undefined> {
    return Resident.model.findOne({userId: userId}).lean().exec()
        .then((result) => {
            if (result != null) {
                return Promise.resolve(result as Resident);
            }
            return Promise.resolve(undefined);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}
