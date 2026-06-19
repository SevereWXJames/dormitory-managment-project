import reservationJSON from "../../test_data/reservationSlots.json" with {type: "json"};
import type {ReservationSlot} from "../dataTypes/reservationSlot.ts";

export async function getReservationsBookedByUserId(id: string): Promise<[ReservationSlot]> {
    return reservationJSON.reservationSlots.filter((reservationSlot) => {
        return reservationSlot.booked && reservationSlot.bookedBy === id;
    }) as [ReservationSlot];
}

export async function getReservationsSlotsByServiceId(id: string): Promise<[ReservationSlot]> {
    return reservationJSON.reservationSlots.filter((reservationSlot) => {
        return reservationSlot.serviceId === id;
    }) as [ReservationSlot];
}