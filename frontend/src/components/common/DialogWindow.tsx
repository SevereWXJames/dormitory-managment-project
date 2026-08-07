import {Button} from "@/components/ui/button";
import {
    Dialog, DialogClose,
    DialogFooter, DialogContent, DialogHeader, DialogTitle, DialogDescription
} from "@/components/ui/dialog.tsx";

type CancelBookingDialogProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    description: string;
    children?: React.ReactNode;
}

export function DialogWindow(props: CancelBookingDialogProps) {
    return (
        <Dialog open={props.isOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                    <DialogDescription>
                        {props.description}
                    </DialogDescription>
                </DialogHeader>
                {props.children}
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