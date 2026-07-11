import {useCancelBookingMutation, useMakeBookingMutation} from "@/context/api/apiServices/reservationsApi.ts";
import {useSelector} from "react-redux";
import {getUserId} from "@/context/authenticationSlice.ts";

type useReservationApiProps = {
    slotId: string | null,
    serviceName: string | null,
}

export function useReservationApi(props: useReservationApiProps) {
    const userId = useSelector(getUserId);
    const [makeBooking, {
        data: makeBookingMessage,
        isLoading: isReserveLoading,
        isError: isReserveError,
        error: reserveError
    }] = useMakeBookingMutation();
    const [cancelBooking, {
        data: cancelBookingMessage,
        isLoading: isCancelLoading,
        isError: isCancelError,
        error: cancelError
    }] = useCancelBookingMutation();

    const confirmReservation = async () => {
        await makeBooking({
            serviceName: props.serviceName,
            slotId: props.slotId,
            userId: userId,
        }).unwrap();
    };

    const cancelReservation = async () => {
        await cancelBooking({
            serviceName: props.serviceName,
            slotId: props.slotId,
            userId: userId,
        }).unwrap();
    };

    return {
        makeBooking,
        cancelBooking,
        makeBookingMessage,
        cancelBookingMessage,
        isReserveLoading,
        isCancelLoading,
        isReserveError,
        isCancelError,
        cancelError,
        reserveError,
        confirmReservation,
        cancelReservation,
    }
}