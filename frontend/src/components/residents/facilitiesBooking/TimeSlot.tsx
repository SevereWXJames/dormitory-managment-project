import {Button} from "@/components/ui/button";
import type {ReservationSlot} from "@/dataTypes/reservationSlot.ts";

type TimeSlotProps = {
    slot: ReservationSlot
}
export function TimeSlot(props: TimeSlotProps){
    return(<>
        <Button className="p-4 m-2" variant="outline">{`${props.slot.startTime} | 1 hr`}</Button>
    </>)
}