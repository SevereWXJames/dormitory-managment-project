import {type ReservationSlot, ReservationSlotModel} from "../dataTypes/reservationSlot.ts";
import {Types} from "mongoose";

export async function getReservationsBookedByUserId(userId: string): Promise<ReservationSlot[]> {
    const cursor = ReservationSlotModel.find({bookedBy: userId}).lean();
    const results: ReservationSlot[] = [];

    for await (const result of cursor) {
        try {
            if (result != null) {
                results.push(result as ReservationSlot);
            }
        } catch (e) {
            // "Pass"
        }
    }

    return Promise.resolve(results);
}

export async function getReservationsSlotsByServiceId(serviceId: string): Promise<ReservationSlot[]> {
    const cursor = ReservationSlotModel.find({serviceId: serviceId}).lean();
    const results: ReservationSlot[] = [];

    for await (const result of cursor) {
        try {
            if (result != null) {
                results.push(result as ReservationSlot);
            }
        } catch (e) {
            // "Pass"
        }
    }

    return Promise.resolve(results);
}

export async function bookReservationSlot(serviceId: string | string[], slotId: string, userId: string){
    //TODO:
    // Given a service id and a slot id, set the slot with given slotId and serviceId to be booked by userData
    // 1. Check that the slot is available
    // 2. Check that the slot has not been booked.
    // 3. Set slot bookedBy to be userId
    // 4. Set slot booked to be true
    // 5. Return status of action

    const id = new Types.ObjectId(slotId);
    const filter = {serviceId: serviceId, _id: id, booked: false};
    const update = {$set: {booked: true, bookedBy: userId}};
    const options = { new: true } as const;

    const res = await ReservationSlotModel
        .findOneAndUpdate(filter, update, options).lean().exec();
    if(!res){
        throw Error("Error, slot already booked!");
    }
    return res;
}
export async function getAllSlots(serviceId: string){
    //TODO:
    // Given a service id, get all slots for that service.
    // 1. Check that the service exists
    // 2. Find all slots
    // 3. Return all slots
    try{
        return await ReservationSlotModel.find({serviceId: serviceId}).lean().exec();
    }catch(error){
        throw Error(`Error getting slots for service ${serviceId}`, {cause: error});
    }

}

export async function getAllFreeSlots(serviceId: string){
    //TODO:
    // Given a service id, get all free slots for that service.
    try{
        return await ReservationSlotModel.find({serviceId: serviceId, booked: false}).lean().exec();
    }catch(error){
        throw Error(`Error finding free slots for service ${serviceId}`, {cause: error});
    }
}
export async function getAllReservedSlots(serviceId: string){
    //TODO:
    // Given a service id, get all booked slots for that service.
    try{
        return await ReservationSlotModel.find({serviceId: serviceId, booked: true}).lean().exec();
    }catch(error){
        throw Error(`Error finding reserved slots for service ${serviceId}`, {cause: error});
    }
}
