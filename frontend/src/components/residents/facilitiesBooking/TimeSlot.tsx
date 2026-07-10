import {Button} from "@/components/ui/button";
import type {ReservationSlot} from "@/dataTypes/reservationSlot.ts";

type TimeSlotProps = {
    slot: ReservationSlot
}
export function TimeSlot(props: TimeSlotProps){
    return(<>
        <Button className="p-4 m-2 width:fit-content" variant="outline" disabled={!props.slot.booked}>{`Start: ${props.slot.startTimeString} | Duration: 1 hour`}</Button>
    </>)
}