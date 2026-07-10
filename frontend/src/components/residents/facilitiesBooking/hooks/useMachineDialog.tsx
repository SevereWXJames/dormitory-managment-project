import {
    useGetSlotsByServiceNameQuery,
} from "@/context/api/apiServices/reservationSlotsApi.ts";

export function useMachineDialog(machineName: string){
    const {data: slots, isLoading, isError, error} = useGetSlotsByServiceNameQuery(machineName);
    return {
        slots,
        isLoading,
        isError,
        error};
}