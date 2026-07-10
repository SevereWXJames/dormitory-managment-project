import {useGetServicesQuery} from "@/context/api/apiServices/servicesApi.ts";

export function useMachineOptions(){
    const {data: machineServices, isLoading, isError, error} = useGetServicesQuery();
    console.log(`data: ${machineServices}`);
    const machines = machineServices?.map((service) =>
        ({id: service._id, name: service.name}));
    return {isLoading,
        isError : isError,
        error,
        machines: machines ?? [], };
}