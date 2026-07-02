import reservationJSON from "../../test_data/reservationSlots.json" with {type: "json"};
import {ReservationSlot} from "../dataTypes/reservationSlot.ts";

export async function getReservationsBookedByUserId(userId: string): Promise<ReservationSlot[]> {
    const cursor = ReservationSlot.model.find({bookedBy: userId}).lean();
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
    const cursor = ReservationSlot.model.find({serviceId: serviceId}).lean();
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