import { MachineButton } from "@/components/residents/facilitiesBooking/MachineButton.tsx";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {TimeSlot} from "@/components/residents/facilitiesBooking/TimeSlot.tsx";

export type Machine = {
    id: string;
    name: string;
};

export type Slot = {duration: string, startTime: string, date: string}

type MachineDialogProps = {
    machine : Machine;
    slots: Slot[]
}
export function MachineDialog(props : MachineDialogProps) {
    const handleClick = () => {};

    return (
        <Dialog>
            <DialogTrigger asChild>
                <MachineButton text={props.machine.name} value={props.machine.id} onClick={handleClick} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="!text-black">Book a time:</DialogTitle>
                    <DialogDescription>Select a time slot below:</DialogDescription>
                </DialogHeader>
                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                    {props.slots.map((slot)=>(<TimeSlot slot={slot}/>))}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Confirm</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}