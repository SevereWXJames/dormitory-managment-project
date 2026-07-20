import {useGetServicesQuery} from "@/context/api/apiServices/servicesApi.ts";

export function useMachineOptions(){
    const {data: machineServices, isLoading, isError, error} = useGetServicesQuery();

    const machines = machineServices?.map((service) =>
        ({id: service._id, name: service.name, uuid: service.IoTUUID}));

    return {isLoading,
        isError : isError,
        error,
        machines: machines ?? [], };
}