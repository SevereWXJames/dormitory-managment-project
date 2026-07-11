import {useCancelBookingMutation} from "@/context/api/apiServices/reservationsApi.ts";
import {useSelector} from "react-redux";
import {getUserId} from "@/context/authenticationSlice.ts";

type useCancelReservationApiProps = {
    slotId: string | null,
    serviceName: string | null,
}

export function useCancelReservationApi(props: useCancelReservationApiProps) {
    const [cancelBooking, {data: message, isLoading, isError, error,}] = useCancelBookingMutation();
    const userId = useSelector(getUserId);

    const cancelReservation = async () => {
        await cancelBooking({
            serviceName: props.serviceName,
            slotId: props.slotId,
            userId: userId,
        }).unwrap();
    };

    return {
        cancelReservation, cancelBooking, message, isLoading, isError, error
    }
}