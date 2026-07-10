import { Separator } from "@/components/ui/separator";
import React from "react";
import {MachineDialog} from "@/components/residents/facilitiesBooking/MachineDialog.tsx";
import {useMachineOptions} from "@/components/residents/facilitiesBooking/hooks/useMachineOptions.tsx";

export function MachineOptions() {
    const {MACHINES, slots} = useMachineOptions();
    return (
        <div className="machineOptions">
            {MACHINES.map((machine) => (
                <React.Fragment key={machine.id}>
                    <MachineDialog machine={machine} slots={slots} />
                    <Separator className="my-2" />
                </React.Fragment>
            ))}
        </div>
    );
}