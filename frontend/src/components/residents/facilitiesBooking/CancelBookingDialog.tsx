// import {Button} from "@/components/ui/button";
// import {
//     Dialog, DialogClose,
//     DialogFooter, DialogContent, DialogHeader, DialogTitle, DialogDescription
// } from "@/components/ui/dialog.tsx";
import {DialogWindow} from "@/components/common/DialogWindow.tsx";

type CancelBookingDialogProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function CancelBookingDialog(props: CancelBookingDialogProps) {
    const title = "Cancel booking?";
    const description = " Warning: This action cannot be undone.";
    return (
        <DialogWindow isOpen={props.isOpen}
                      onConfirm={props.onConfirm}
                      onCancel={props.onCancel}
                      title={title}
                      description={description}/>
        // <Dialog open={props.isOpen}>
        //     <DialogContent>
        //         <DialogHeader>
        //             <DialogTitle>Cancel booking?</DialogTitle>
        //             <DialogDescription>
        //                 Warning: This action cannot be undone.
        //             </DialogDescription>
        //         </DialogHeader>
        //         <DialogFooter>
        //             <DialogClose asChild>
        //                 <Button variant="outline" onClick={props.onConfirm}>Confirm</Button>
        //             </DialogClose>
        //             <DialogClose asChild>
        //                 <Button variant="outline" onClick={props.onCancel}>Cancel</Button>
        //             </DialogClose>
        //         </DialogFooter>
        //     </DialogContent>
        // </Dialog>
    );
}