import {type Room, RoomModel} from "../dataTypes/room.ts";
import {type Resident, ResidentModel} from "../dataTypes/user.ts";
import mongoose from "mongoose";

export async function getAllRooms(): Promise<Room[]> {
    const cursor = RoomModel.find({ }).lean();
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

export async function getRoomById(_id: mongoose.Types.ObjectId): Promise<Room | undefined> {
    return RoomModel.findOne({_id: _id}).lean().exec()
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

export async function getRoomByUserId(_id: mongoose.Types.ObjectId): Promise<Room | undefined> {
    const resident = await getResidentByUserId(_id);
    
    if (resident === undefined) {
        return Promise.resolve(undefined);
    }

    return RoomModel.findOne({_id: resident.roomId}).lean().exec()
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
    const cursor = ResidentModel.find({ }).lean();
    const results: Resident[] = [];

    for await (const result of cursor) {
        try {
            if (result != null) {
                results.push(result as unknown as Resident);
            }
        } catch (e) {
            // "Pass"
        }
    }

    return Promise.resolve(results);
}

export async function getResidentByUserId(userId: mongoose.Types.ObjectId): Promise<Resident | undefined> {
    return ResidentModel.findOne({userId: userId}).lean().exec()
        .then((result) => {
            if (result != null) {
                return Promise.resolve(result as unknown as Resident);
            }
            return Promise.resolve(undefined);
        })
        .catch((e) => {
            return Promise.reject(e);
        });
}
