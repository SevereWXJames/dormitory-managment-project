import {useGetAllReservationsQuery} from "@/context/api/apiServices/reservationSlotsApi.ts";

export function useGetReservationsApi(){
    const {data: reservations, isLoading, isError, error}  = useGetAllReservationsQuery();
    return {
        isLoading: isLoading,
        isError,
        error: error?.message ?? null,
        bookings: reservations ?? [],
    };
}