import {type ReservationSlot, ReservationSlotModel} from "../dataTypes/reservationSlot.ts";
import mongoose, {Types} from "mongoose";
import {BOOKING_COST} from "../utility/pricesForBookings.ts";
import {CreditBalanceModel} from "../dataTypes/creditBalance.ts";
import {type Service, ServiceModel} from "../dataTypes/service.ts";
import {sendReservationUpdateIoT} from "./IoT/IoTDataServices.ts";

export async function getReservationsBookedByUserId(userId: mongoose.Types.ObjectId): Promise<ReservationSlot[]> {
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

export async function getReservationsSlotsByServiceId(serviceId: mongoose.Types.ObjectId): Promise<ReservationSlot[]> {
    const cursor = ReservationSlotModel.find({serviceId: new mongoose.Types.ObjectId(serviceId)}).lean();
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

export async function hasEnoughCredits(userId: mongoose.Types.ObjectId){
    const id = new Types.ObjectId(userId);
    const balanceDoc = await CreditBalanceModel.findOne({userId: id}).lean().exec();
    if(!balanceDoc) throw Error("Error, no credit balance!");
    const balanceCents = balanceDoc.balanceCents;
    console.log(`balance: ${JSON.stringify(balanceDoc, null, 2)}`);
    return balanceCents >= BOOKING_COST;
}

export async function payBooking(userId: mongoose.Types.ObjectId){
    const id = new Types.ObjectId(userId);
    const filter = {userId: id};
    const update = {$inc: {balanceCents: -1 * BOOKING_COST}};
    const options = {new: true}
    return await CreditBalanceModel.findOneAndUpdate(filter, update, options).lean().exec();
}

export async function bookReservationSlot(serviceId: mongoose.Types.ObjectId | mongoose.Types.ObjectId[], slotId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId){
    const id = new Types.ObjectId(slotId);
    const hasEnough = await hasEnoughCredits(userId);
    if(!hasEnough) throw Error("Error, not enough credits.");

    const filter = {serviceId: serviceId, _id: id, booked: false};
    const update = {$set: {booked: true, bookedBy: userId}};
    const options = { returnDocument: 'after' } as const;
    const res = await ReservationSlotModel
        .findOneAndUpdate(filter, update, options).lean().exec();
    if(!res){
        throw Error("Error, slot already booked!");
    }
    await payBooking(userId);

    const service = await ServiceModel.findById(serviceId, null, null).lean().exec() as Service;
    const obj = {
        UUID: service.IoTUUID,
        type: "facilityBooked",
        data: {
            date: res.startTime,
            durationSeconds: res.durationSeconds
        }
    };
    await sendReservationUpdateIoT(obj);

    return res;
}

export async function bookReservationSlotByName(serviceName: string | string[], slotId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId){
    const id = new Types.ObjectId(slotId);
    const hasEnough = await hasEnoughCredits(userId);
    if(!hasEnough) throw Error("Error, not enough credits.");

    const filter = {serviceName: serviceName, _id: id, booked: false};
    const update = {$set: {booked: true, bookedBy: userId}};
    const options = { new: true } as const;

    const res = await ReservationSlotModel
        .findOneAndUpdate(filter, update, options).lean().exec();
    if(!res){
        throw Error("Error, slot already booked!");
    }
    await payBooking(userId);

    const service = await ServiceModel.findOne({name: serviceName}, null, null).lean().exec() as Service;
    const obj = {
        UUID: service.IoTUUID,
        type: "facilityBooked",
        data: {
            date: res.startTime,
            durationSeconds: res.durationSeconds
        }
    };
    await sendReservationUpdateIoT(obj);

    return res;
}

export async function refundBooking(userId: mongoose.Types.ObjectId){
    const id = new Types.ObjectId(userId);
    const filter = {userId: id};
    const update = {$inc: {balanceCents: BOOKING_COST}};
    const options = {new: true}
    return await CreditBalanceModel.findOneAndUpdate(filter, update, options).lean().exec();
}

export async function cancelReservationSlot(serviceId: mongoose.Types.ObjectId | mongoose.Types.ObjectId[], slotId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId){
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

export async function cancelReservationSlotByName(serviceName: string | string[], slotId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId){
    const id = new Types.ObjectId(slotId);
    const filter = {serviceName: serviceName, _id: id, booked: true};
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

export async function getAllSlots(serviceId: mongoose.Types.ObjectId){
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

export async function getAllFreeSlots(serviceId: mongoose.Types.ObjectId){
    //TODO:
    // Given a service id, get all free slots for that service.
    try{
        return await ReservationSlotModel.find({serviceId: serviceId, booked: false}).lean().exec();
    }catch(error){
        throw Error(`Error finding free slots for service ${serviceId}`, {cause: error});
    }
}
export async function getAllReservedSlots(serviceId: mongoose.Types.ObjectId){
    //TODO:
    // Given a service id, get all booked slots for that service.
    try{
        return await ReservationSlotModel.find({serviceId: serviceId, booked: true}).lean().exec();
    }catch(error){
        throw Error(`Error finding reserved slots for service ${serviceId}`, {cause: error});
    }
}
