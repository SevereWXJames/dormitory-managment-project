import { api } from "../api";
import type {ReservationSlot} from "@/dataTypes/reservationSlot.ts";
import type {Booking} from "@/types/residents/types.tsx";
//Helper to convert response to Booking
function toBooking(slot: ReservationSlot): Booking {
    const startDate = new Date(slot.startTime * 1000);
    return {
        _id: slot._id,
        eventName: `Machine ${slot.serviceId}`,
        serviceId: slot.serviceId,
        serviceName: slot.serviceName ?? null,
        booked: slot.booked,
        bookedBy: slot.bookedBy,
        startTime: startDate.toISOString(),
        date: startDate.toLocaleDateString(),
        durationSeconds: slot.durationSeconds,
    };
}

export const reservationSlotsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getBookings: builder.query<Booking[], string>({
            query: (userId) => ({ url: `/reservations/get-booked-by-user/${encodeURIComponent(userId)}`}),
            transformResponse: (reservations: ReservationSlot[]) => reservations.map(toBooking),
            providesTags: ["ReservationSlots"],
        }),

        getSlotsByServiceId: builder.query<ReservationSlot[], string>({
            query: (serviceId) => ({ url: `/reservations/get-slots-by-service/${encodeURIComponent(serviceId)}`}),
            providesTags: ["ReservationSlots"],
        }),

        getSlotsByServiceName: builder.query<ReservationSlot[], string>({
            query: (serviceName) => ({ url: `/reservations/get-slots-by-service-name/${encodeURIComponent(serviceName)}`}),
            providesTags: ["ReservationSlots"],
        }),

    }),
});

export const {useGetBookingsQuery,
    useLazyGetBookingsQuery,
    useGetSlotsByServiceIdQuery,
useGetSlotsByServiceNameQuery} = reservationSlotsApi;