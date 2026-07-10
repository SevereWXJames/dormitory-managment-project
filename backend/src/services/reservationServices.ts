import {type ReservationSlot, ReservationSlotModel} from "../dataTypes/reservationSlot.ts";
import {Types} from "mongoose";
import {CreditBalances} from "../database/models/creditBalance.model.ts";
import {BOOKING_COST} from "../utility/pricesForBookings.ts";

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

export async function getReservationsSlotsByServiceName(serviceName: string): Promise<ReservationSlot[]> {
    const cursor = ReservationSlotModel.find({serviceName: serviceName}).lean();
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

export async function hasEnoughCredits(userId: string){
    const id = new Types.ObjectId(userId);
    const balanceDoc = await CreditBalances.findOne({userId: id}).lean().exec();
    if(!balanceDoc) throw Error("Error, no credit balance!");
    const balanceCents = balanceDoc.balanceCents;
    return balanceCents >= BOOKING_COST;
}

export async function payBooking(userId: string){
    const id = new Types.ObjectId(userId);
    const filter = {userId: id};
    const update = {$inc: {balanceCents: -1 * BOOKING_COST}};
    const options = {new: true}
    return await CreditBalances.findOneAndUpdate(filter, update, options).lean().exec();
}

export async function bookReservationSlot(serviceId: string | string[], slotId: string, userId: string){
    //TODO:
    // Given a service id and a slot id, set the slot with given slotId and serviceId to be booked by userData
    // 1. Check that the slot is available
    // 2. Check that the slot has not been booked, and that the user has enough balance.
    // 3. Set slot bookedBy to be userId
    // 4. Set slot booked to be true
    // 5. Decrement the balance.
    // 6. Return status of action

    const id = new Types.ObjectId(slotId);
    const hasEnough = await hasEnoughCredits(userId);
    if(!hasEnough) throw Error("Error, not enough credits.");

    const filter = {serviceId: serviceId, _id: id, booked: false};
    const update = {$set: {booked: true, bookedBy: userId}};
    const options = { new: true } as const;

    const res = await ReservationSlotModel
        .findOneAndUpdate(filter, update, options).lean().exec();
    if(!res){
        throw Error("Error, slot already booked!");
    }
    await payBooking(userId);
    return res;
}

export async function refundBooking(userId: string){
    const id = new Types.ObjectId(userId);
    const filter = {userId: id};
    const update = {$inc: {balanceCents: BOOKING_COST}};
    const options = {new: true}
    return await CreditBalances.findOneAndUpdate(filter, update, options).lean().exec();
}

export async function cancelReservationSlot(serviceId: string | string[], slotId: string, userId: string){
    //TODO:
    // Given a service id and a slot id, set the slot with given slotId and serviceId to be booked by userData
    // 1. Check that the slot has been booked.
    // 2. Set slot bookedBy to be null
    // 3. Set slot booked to be false
    // 4. Refund the balance
    // 5. Return status of action
    const id = new Types.ObjectId(slotId);
    const filter = {serviceId: serviceId, _id: id, booked: true};
    const update = {$set: {booked: false, bookedBy: null}};
    const options = { new: true } as const;
    const res = await ReservationSlotModel
        .findOneAndUpdate(filter, update, options).lean().exec();
    if(!res){
        throw Error("Error canceling booking!");
    }
    await refundBooking(userId);
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
