import {toast} from "sonner";
import {useCancelReservationApi} from "@/components/residents/facilitiesBooking/hooks/useCancelReservationApi.tsx";
import type {Booking} from "@/types/residents/types.ts";

type useRowDropDownProps = {
    bookingInfo : Booking;
}
export function useRowDropDown(props : useRowDropDownProps){
    const slotId = props.bookingInfo._id ?? null;
    const serviceName = props.bookingInfo.serviceName ?? null;
    const {cancelReservation} = useCancelReservationApi({slotId, serviceName});

    const onCancel = async () => {
        try {
            await cancelReservation();
            toast.success("Successfully cancelled slot!");
        } catch (err) {
            console.log(`Error cancelling slot: ${err}`);
            toast.error("Error: failed to cancel slot");
        }
    }

    return{onCancel}
}