import {useCancelBookingMutation, useMakeBookingMutation} from "@/context/api/apiServices/reservationsApi.ts";

export function useReservationApi(){
    const [makeBooking, {
        data: makeBookingMessage,
        isLoading: isReserveLoading,
        isError: isReserveError,
        error: reserveError}] = useMakeBookingMutation();
    const [cancelBooking, {
        data: cancelBookingMessage,
        isLoading: isCancelLoading,
        isError: isCancelError,
        error: cancelError}] = useCancelBookingMutation();

    return{
        makeBooking,
        cancelBooking,
        makeBookingMessage,
        cancelBookingMessage,
        isReserveLoading,
        isCancelLoading,
        isReserveError,
        isCancelError,
        cancelError, reserveError
    }
}