import {useMakeBookingMutation} from "@/context/api/apiServices/reservationsApi.ts";
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

    const confirmReservation = async () => {
        await makeBooking({
            serviceName: props.serviceName,
            slotId: props.slotId,
            userId: userId,
        }).unwrap();
    };

    return {
        makeBooking,
        makeBookingMessage,
        isReserveLoading,
        isReserveError,
        reserveError,
        confirmReservation,
    }
}