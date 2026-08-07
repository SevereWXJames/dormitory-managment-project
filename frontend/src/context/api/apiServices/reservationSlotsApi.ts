import { api } from "../api";
import type {ReservationSlot} from "@/dataTypes/reservationSlot.ts";
import type {Booking} from "@/types/residents/types.tsx";
//Helper to convert response to Booking
function toBooking(slot: ReservationSlot): Booking {
    return {
        _id: slot._id,
        eventName: `Machine ${slot.serviceId}`,
        serviceId: slot.serviceId,
        serviceName: slot.serviceName ?? null,
        booked: slot.booked,
        bookedBy: slot.bookedBy,
        bookedByName: slot.bookedByName ?? null,
        startTime: slot.startTime,
        durationSeconds: slot.durationSeconds,
    };
}

export const reservationSlotsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBookings: builder.query<Booking[], string>({
            query: (userId) => ({ url: `/reservations/get-booked-by-user/${encodeURIComponent(userId)}`}),
            transformResponse: (reservations: ReservationSlot[]) => reservations.map(toBooking),
            providesTags: ["ReservationSlots", "Booking"],
        }),

        getAllReservations: builder.query<Booking[], void>({
            query: () => ({ url: `/reservations/get-reservations`}),
            transformResponse: (reservations: ReservationSlot[]) => reservations.map(toBooking),
            providesTags: ["ReservationSlots", "Booking"],
        }),

        getSlotsByServiceId: builder.query<ReservationSlot[], string>({
            query: (serviceId) => ({ url: `/reservations/get-slots-by-service/${encodeURIComponent(serviceId)}`}),
            providesTags: ["ReservationSlots"],
        }),

        getFreeSlotsByServiceId: builder.query<ReservationSlot[], string>({
            query: (serviceId) => ({ url: `/reservations/get-free-slots-by-service/${encodeURIComponent(serviceId)}`}),
            providesTags: ["ReservationSlots"],
        }),

        getReservedSlotsByServiceId: builder.query<ReservationSlot[], string>({
            query: (serviceId) => ({ url: `/reservations/get-all-reserved-slots-by-service/${encodeURIComponent(serviceId)}`}),
            providesTags: ["ReservationSlots"],
        }),

    }),
});

export const {useGetBookingsQuery,
    useGetAllReservationsQuery,
useGetSlotsByServiceIdQuery,
useGetFreeSlotsByServiceIdQuery,
useGetReservedSlotsByServiceIdQuery} = reservationSlotsApi;