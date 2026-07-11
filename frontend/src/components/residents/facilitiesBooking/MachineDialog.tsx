import { MachineButton } from "@/components/residents/facilitiesBooking/MachineButton.tsx";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {TimeSlot} from "@/components/residents/facilitiesBooking/TimeSlot.tsx";
import {useMachineDialog} from "@/components/residents/facilitiesBooking/hooks/useMachineDialog.tsx";
import type {ReservationSlot} from "@/dataTypes/reservationSlot.ts";

export type Machine = {
    id: string;
    name: string;
};

export type Slot = {duration: string, startTime: string, date: string}

type MachineDialogProps = {
    machine : Machine;
}

export function MachineDialog(props : MachineDialogProps) {
    const {slots,
        isLoading, isError,
        isConfirmLoading, error,
        onCancel, onConfirm,
        selectedSlot, setSelectedSlot,
        pendingToast, setPendingToast} = useMachineDialog(props.machine.name);
    let message;
    let reservations: ReservationSlot[] = [];
    if(isLoading) message = <p>...Loading</p>
    if(isError){
        console.log(`Error: ${error}`);
        message = <p>Error retrieving time slots</p>
    }else if(!slots || slots.length <= 0){
        message = <p>No available slots</p>
    }else{
        reservations = slots;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <MachineButton text={props.machine.name} value={props.machine.id} />
            </DialogTrigger>
            <DialogContent onCloseAutoFocus={() => {
                pendingToast?.();
                setPendingToast(null);
            }}>
                <DialogHeader>
                    <DialogTitle className="!text-black">Book a time:</DialogTitle>
                    <DialogDescription>Select a time slot below:</DialogDescription>
                </DialogHeader>
                {(isError || !slots || slots.length <= 0) && message}
                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4 flex flex-col">
                    {reservations.map((slot)=>
                        (<TimeSlot
                            key={slot._id}
                            slot={slot}
                            selected={selectedSlot?._id === slot._id}
                            onClick={() => setSelectedSlot(slot)}/>))}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={onConfirm} disabled={!selectedSlot || isConfirmLoading}>Confirm</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}