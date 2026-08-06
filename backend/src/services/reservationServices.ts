import {
    type ReservationSlot,
    ReservationSlotModel,
    type ReservationSlotTemplate
} from "../dataTypes/reservationSlot.ts";
import mongoose, {Types} from "mongoose";
import {BOOKING_COST} from "../utility/pricesForBookings.ts";
import {CreditBalanceModel} from "../dataTypes/creditBalance.ts";
import {type Service, ServiceModel} from "../dataTypes/service.ts";
import {sendReservationUpdateIoT} from "./IoT/IoTDataServices.ts";
import {getAllServices} from "./serviceServices.ts";
import {UserModel} from "../dataTypes/user.ts";
import type {User} from "../dataTypes/user.ts";
import reservation from "../routes/reservation.js";

function getMatchingUserById(userId: string, users : User[]){
    return users.find(user => (user._id.toString() == userId));
}

function getMatchingUserNameById(userId: string, users: User[]){
    return getMatchingUserById(userId, users)?.name;
}

export async function getReservations(){
    try{
        const reservations : ReservationSlot[] = await ReservationSlotModel.find({booked: true}).lean() as ReservationSlot[];
        const users : User[] = await UserModel.find({}) as User[];
        const results : ReservationSlot[] = reservations
            .filter(reservation => reservation.bookedBy)
            .map(reservation =>
        {return {...reservation, bookedByName: getMatchingUserNameById(reservation.bookedBy!.toString(), users)}});
        return results;

    }catch(error){
        throw Error("Error fetching reservations!", {cause: error});
    }
}
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

export async function getFutureReservationsSlotsByServiceId(serviceId: mongoose.Types.ObjectId): Promise<ReservationSlot[]> {
    const currDate = new Date();
    return await ReservationSlotModel.find({serviceId: serviceId, startTime: { $gt: currDate }}).lean().exec() as ReservationSlot[];
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
            durationSeconds: res.durationSeconds,
            userId: userId
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
            durationSeconds: res.durationSeconds,
            userId: userId
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
    // Given a service id, get all future free slots for that service.
    try{
        const currDate = new Date();
        return await ReservationSlotModel.find({serviceId: serviceId, booked: false, startTime: { $gt: currDate }}).lean().exec();
    }catch(error){
        throw Error(`Error finding free slots for service ${serviceId}`, {cause: error});
    }
}
export async function getAllReservedSlots(serviceId: mongoose.Types.ObjectId){
    //TODO:
    // Given a service id, get all future booked slots for that service.
    try{
        const currDate = new Date();
        return await ReservationSlotModel.find({serviceId: serviceId, booked: true, startTime: { $gt: currDate }}).lean().exec();
    } catch (error) {
        throw Error(`Error finding reserved slots for service ${serviceId}`, {cause: error});
    }
}

export async function handleSlotUpdates() {
    try {
        await deleteOldSlots();
        await createNewSlots();
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error: " + error.toString());
        } else {
            console.log("Unknown error occurred!")
        }
    }
}

async function deleteOldSlots() {
    const currDayStart = new Date();
    currDayStart.setHours(0, 0, 0, 0);
    await ReservationSlotModel.deleteMany({startTime: {$lt: currDayStart}});
}

async function createNewSlots() {
    const allServices = await getAllServices();
    const promises = allServices.map(createSlotsForService);
    await Promise.all(promises);
}

async function createSlotsForService(service: Service) {
    const slotsToCreate = createSlotObjects(service);
    const promises = slotsToCreate.map(insertSlotIfNotExisting);
    await Promise.all(promises);
}

async function insertSlotIfNotExisting(slot: ReservationSlotTemplate) {
    await ReservationSlotModel.updateOne({serviceId: slot.serviceId, startTime: slot.startTime}, {
            $setOnInsert: {
                serviceId: slot.serviceId,
                serviceName: slot.serviceName,
                booked: slot.booked,
                startTime: slot.startTime,
                durationSeconds: slot.durationSeconds
            }
        },
        {upsert: true});
}

const DEFAULT_DAYS_AHEAD = 7;

function createSlotObjects(service: Service) {
    let slotObjects: ReservationSlotTemplate[] = [];

    let daysAhead = Number(process.env.SLOT_RESET_DAYS_AHEAD);
    if (isNaN(daysAhead)) daysAhead = DEFAULT_DAYS_AHEAD;
    const numberOfSlotsToCreatePerDay = Math.floor(((service.reservationEndHour - service.reservationStartHour) * 3600) / service.reservationDurationSeconds);
    console.assert(numberOfSlotsToCreatePerDay >= 0);

    for (let day = 0; day < daysAhead; day++) {
        for (let slot = 0; slot < numberOfSlotsToCreatePerDay; slot++) {
            const date = new Date();
            date.setDate(date.getDate() + day);
            const totalOffset = slot * service.reservationDurationSeconds + (service.reservationStartHour * 3600);
            const hours = Math.floor(totalOffset / 3600);
            const minutes = Math.floor((totalOffset % 3600) / 60);
            const seconds = totalOffset % 60;
            date.setHours(hours, minutes, seconds, 0);
            slotObjects.push({
                serviceId: new mongoose.Types.ObjectId(service._id),
                serviceName: service.name,
                booked: false,
                startTime: date,
                durationSeconds: service.reservationDurationSeconds
            });
        }
    }
    return slotObjects;
}