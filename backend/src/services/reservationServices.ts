import reservationJSON from "../../test_data/reservationSlots.json" with {type: "json"};
import type {ReservationSlot} from "../dataTypes/reservationSlot.ts";

export async function getReservationsBookedByUserId(_id: string): Promise<ReservationSlot[]> {
    return reservationJSON.reservationSlots.filter((reservationSlot) => {
        return reservationSlot.booked && reservationSlot.bookedBy === _id;
    }) as ReservationSlot[];
}

export async function getReservationsSlotsByServiceId(_id: string): Promise<ReservationSlot[]> {
    return reservationJSON.reservationSlots.filter((reservationSlot) => {
        return reservationSlot.serviceId === _id;
    }) as ReservationSlot[];
}