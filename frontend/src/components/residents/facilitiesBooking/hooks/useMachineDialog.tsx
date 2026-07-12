import {useGetSlotsByServiceNameQuery,} from "@/context/api/apiServices/reservationSlotsApi.ts";
import {useState} from "react";
import type {ReservationSlot} from "@/dataTypes/reservationSlot.ts";
import {useReservationApi} from "@/components/residents/facilitiesBooking/hooks/useReservationApi.tsx";
import { toast } from "sonner"
import {useGetHumanReadableTime} from "@/components/residents/facilitiesBooking/hooks/useGetHumanReadableTime.tsx";

export type Machine = {
    id: string;
    name: string;
    uuid: string;
};


export function useMachineDialog(machine: Machine){
    const [selectedSlot, setSelectedSlot] = useState<ReservationSlot | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const slotId = selectedSlot?._id ?? null;
    const serviceName = selectedSlot?.serviceName ?? null;
    const serviceUUID = machine.uuid;
    const {confirmReservation, isReserveError, isReserveLoading, reserveError} = useReservationApi({slotId, serviceName});
    const [pendingToast, setPendingToast] = useState<(() => void) | null>(null);
    const {getTime} = useGetHumanReadableTime();

    const onCancel = () => {
        setSelectedSlot(null);}

    const onConfirm = async () => {
        try {
            await confirmReservation();
            setSelectedSlot(null);
            setPendingToast(() => () => toast.success("Successfully reserved slot!"));
        } catch (err) {
            console.log(`Error booking slot: ${err}`);
            setSelectedSlot(null);
            setPendingToast(() => () => toast.error("Error: failed to reserve slot"));
        }
    }

    const {data: slotsData, isLoading, isError, error} = useGetSlotsByServiceNameQuery(machine.name);
    const slots = slotsData?.map(slot => ({...slot, startTimeString: getTime(slot.startTime)}));
    return {
        slots,
        isLoading,
        isError,
        error,
        onCancel,
        onConfirm,
        isConfirmLoading: isReserveLoading,
        isConfirmError: isReserveError,
        confirmError: reserveError,
        selectedSlot,
        setSelectedSlot,
        pendingToast, setPendingToast,
        isOpen, setIsOpen,
        serviceUUID};
}