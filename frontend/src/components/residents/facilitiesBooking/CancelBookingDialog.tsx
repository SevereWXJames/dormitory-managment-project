import {Button} from "@/components/ui/button";
import {
    Dialog, DialogClose,
    DialogFooter, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog.tsx";

type CancelBookingDialogProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function CancelBookingDialog(props: CancelBookingDialogProps) {
    return (
        <Dialog open={props.isOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cancel booking?</DialogTitle>
                    <DialogDescription>
                        Warning: This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={props.onConfirm}>Confirm</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="outline" onClick={props.onCancel}>Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}