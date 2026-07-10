import {useGetSlotsByServiceQuery} from "@/context/api/apiServices/reservationSlotsApi.ts";

export function useMachineDialog(machineId: string){
    const {data: slots, isLoading, isError, error} = useGetSlotsByServiceQuery(machineId);
    return {
        slots: slots ?? [],
        isLoading,
        isError,
        error};
}