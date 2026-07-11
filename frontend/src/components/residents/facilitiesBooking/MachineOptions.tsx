import { Separator } from "@/components/ui/separator";
import React from "react";
import {MachineDialog} from "@/components/residents/facilitiesBooking/MachineDialog.tsx";
import {useMachineOptions} from "@/components/residents/facilitiesBooking/hooks/useMachineOptions.tsx";

export function MachineOptions() {
    const {machines, isLoading, isError, error} = useMachineOptions();
    if(isLoading) return <p>Loading...</p>;
    if(isError){
        console.log(`Error: ${error}`);
        return <p>Error: Unable to find machines</p>;
    }
    if(machines.length <= 0) return <p>No available machines</p>;


    return (
        <div className="machineOptions">
            {machines.map((machine) => (
                <React.Fragment key={machine.id}>
                    <MachineDialog machine={machine}/>
                    <Separator className="my-2" />
                </React.Fragment>
            ))}
        </div>
    );
}