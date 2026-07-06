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