import reservationJSON from "../../test_data/reservationSlots.json" with { type: "json" };
export async function getReservationsBookedByUserId(id) {
    return reservationJSON.reservationSlots.filter((reservationSlot) => {
        return reservationSlot.booked && reservationSlot.bookedBy === id;
    });
}
export async function getReservationsSlotsByServiceId(id) {
    return reservationJSON.reservationSlots.filter((reservationSlot) => {
        return reservationSlot.serviceId === id;
    });
}
//# sourceMappingURL=reservationServices.js.map