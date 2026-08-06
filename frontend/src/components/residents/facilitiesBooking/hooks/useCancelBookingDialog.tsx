import {type Dispatch, type SetStateAction, useState} from "react";
import {useCancelReservationApi} from "@/components/residents/facilitiesBooking/hooks/useCancelReservationApi.tsx";
import {toast} from "sonner";
import type {Booking} from "@/types/residents/types.ts";

type useCancelBookingDialogProps = {
    bookingInfo : Booking;
    setDialogOpen: Dispatch<SetStateAction<boolean>>
    isOpen: boolean;
}

export function useCancelBookingDialog(props: useCancelBookingDialogProps){
    const [open, setOpen] = useState(false);
    const slotId = props.bookingInfo._id ?? null;
    const serviceId = props.bookingInfo.serviceId ?? null;
    const {cancelReservation} = useCancelReservationApi({slotId, serviceId});

    const onConfirm = async () => {
        try {
            await cancelReservation();
            toast.success("Successfully cancelled slot!");
        } catch (err) {
            console.log(`Error cancelling slot: ${err}`);
            toast.error("Error: failed to cancel slot");
        }
    }

    const onCancel = () => {
        props.setDialogOpen(false);
    }

    return {open, setOpen, onConfirm, onCancel}
}