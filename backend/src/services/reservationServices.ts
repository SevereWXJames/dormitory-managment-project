import {type ReservationSlot, ReservationSlotModel} from "../dataTypes/reservationSlot.ts";

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

export function bookReservationSlot(serviceId: string, slotId: string, userData: object[]): void{
    //TODO:
    // Given a service id and a slot id, set the slot with given slotId and serviceId to be booked by userData
}
export function getAllFreeSlots(serviceId: string): void{
    // TODO:
    // Given a service id, get all free slots for that service.
}
export function getAllReservedSlots(serviceId: string): void{
    // TODO:
    // Given a service id, get all booked slots for that service.
}
export function getAllSlots(serviceId: string): void{
    // TODO:
    // Given a service id, get all slots for that service.
}