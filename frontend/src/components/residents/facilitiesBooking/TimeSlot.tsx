import {Button} from "@/components/ui/button";
import type {Slot} from "./MachineDialog.tsx"

type TimeSlotProps = {
    slot: Slot
}
export function TimeSlot(props: TimeSlotProps){
    return(<>
        <Button className="p-4 m-2" variant="outline">{`${props.slot.date} | 
        ${props.slot.duration} | ${props.slot.startTime}`}</Button>
    </>)
}