import {Button} from "@/components/ui/button";
import type {ReservationSlot} from "@/dataTypes/reservationSlot.ts";

type TimeSlotProps = {
    slot: ReservationSlot
    onClick: () => void;
    selected?: boolean;
}
export function TimeSlot(props: TimeSlotProps){
    return(<>
        <Button className="p-4 m-2 width:fit-content"
                variant={props.selected ? "default" : "outline"}
                disabled={props.slot.booked}
                onClick={props.onClick}>{`Start: ${props.slot.startTimeString} | Duration: 1 hour`}</Button>
    </>)
}