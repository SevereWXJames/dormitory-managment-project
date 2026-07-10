import {useGetServicesQuery} from "@/context/api/apiServices/servicesApi.ts";

export function useMachineOptions(){
    // const MACHINES: Machine[] = [
    //     { id: "machine_1", name: "Machine 1" },
    //     { id: "machine_2", name: "Machine 2" },
    //     { id: "machine_3", name: "Machine 3" },
    // ];
    //
    // const slots : Slot[] = [
    //     {duration: "1:00:00 hr", startTime: "3:00pm", date: "April 24, 2026"},
    //     {duration: "1:00:00 hr", startTime: "4:00pm", date: "April 25, 2026"},
    //     {duration: "1:00:00 hr", startTime: "5:00pm", date: "April 26, 2026"}
    // ];

    const {data: machineServices, isLoading, isError, error} = useGetServicesQuery();
    const machines = machineServices?.map((service) =>
        ({id: service._id, name: service.name}));
    return {machines: machines ?? [], isLoading, isError, error};
}