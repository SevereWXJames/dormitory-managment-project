import { Separator } from "@/components/ui/separator";
import React from "react";
import {MachineDialog} from "@/components/residents/facilitiesBooking/MachineDialog.tsx";
import {useMachineOptions} from "@/components/residents/facilitiesBooking/hooks/useMachineOptions.tsx";

export function MachineOptions() {
    const {machines} = useMachineOptions();
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