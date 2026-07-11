import {useGetSlotsByServiceNameQuery,} from "@/context/api/apiServices/reservationSlotsApi.ts";
import {useState} from "react";
import type {ReservationSlot} from "@/dataTypes/reservationSlot.ts";
import {useReservationApi} from "@/components/residents/facilitiesBooking/hooks/useReservationApi.tsx";

export function useMachineDialog(machineName: string){
    const [selectedSlot, setSelectedSlot] = useState<ReservationSlot | null>(null);
    const slotId = selectedSlot?._id ?? null;
    const serviceName = selectedSlot?.serviceName ?? null;
    const {confirmReservation, isReserveError, isReserveLoading, reserveError} = useReservationApi({slotId, serviceName});

    const onCancel = () => {
        setSelectedSlot(null);}
    const onConfirm = async () => {
        await confirmReservation();
        setSelectedSlot(null);}

    const getTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        const datevalues = {
            year: date.getFullYear(),
            month: date.getMonth()+1,
            monthName: date.toLocaleDateString('en-US', { month: 'long' }),
            dayName: date.getDay(),
            day:date.getDate(),
            timestring: date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            }),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
        }
        return `${datevalues.monthName} ${datevalues.day}, ${datevalues.timestring}`;
    }
    const {data: slotsData, isLoading, isError, error} = useGetSlotsByServiceNameQuery(machineName);
    const slots = slotsData?.map(slot => ({...slot, startTimeString: getTime(slot.startTime)}));
    return {
        slots,
        isLoading,
        isError,
        onCancel,
        onConfirm,
        isConfirmLoading: isReserveLoading,
        isConfirmError: isReserveError,
        confirmError: reserveError,
        selectedSlot,
        setSelectedSlot,
        error};
}