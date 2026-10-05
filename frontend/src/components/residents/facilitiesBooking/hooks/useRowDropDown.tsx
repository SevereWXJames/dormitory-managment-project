import {toast} from "sonner";
import {useCancelReservationApi} from "@/components/residents/facilitiesBooking/hooks/useCancelReservationApi.tsx";
import type {Booking} from "@/types/residents/types.ts";
import {useState} from "react";

type useRowDropDownProps = {
    bookingInfo : Booking;
}
export function useRowDropDown(props : useRowDropDownProps){
    const slotId = props.bookingInfo._id ?? null;
    const serviceId = props.bookingInfo.serviceId ?? null;
    const {cancelReservation} = useCancelReservationApi({slotId, serviceId});
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const onCancel = () => {
        setIsConfirmOpen(true);
    }

    const confirmCancel = async () => {
        try {
            await cancelReservation();
            toast.success("Successfully cancelled slot!");
        } catch (err) {
            console.log(`Error cancelling slot: ${err}`);
            toast.error("Error: failed to cancel slot");
        }finally {
            setIsConfirmOpen(false);
        }
    }

    const cancelDialogClose = () => {
        setIsConfirmOpen(false);
    }

    return{onCancel, confirmCancel, isConfirmOpen,setIsConfirmOpen, cancelDialogClose}
}