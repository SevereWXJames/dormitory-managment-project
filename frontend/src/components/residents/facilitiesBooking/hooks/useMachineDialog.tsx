import {useGetSlotsByServiceNameQuery,} from "@/context/api/apiServices/reservationSlotsApi.ts";

export function useMachineDialog(machineName: string){

    const getTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        const datevalues = {
            year: date.getFullYear(),
            month: date.getMonth()+1,
            date: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
        }

        return `${datevalues.date}`;
    }
    const {data: slotsData, isLoading, isError, error} = useGetSlotsByServiceNameQuery(machineName);
    const slots = slotsData?.map(slot => ({...slot, startTime: getTime(slot.startTime)}));
    return {
        slots,
        isLoading,
        isError,
        error};
}