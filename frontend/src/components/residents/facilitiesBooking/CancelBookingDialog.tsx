import {DialogComponent} from "@/components/common/Dialog/DialogComponent.tsx";

type CancelBookingDialogProps = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function CancelBookingDialog(props: CancelBookingDialogProps) {
    const title = "Cancel booking?";
    const description = " Warning: This action cannot be undone.";
    return (
        <DialogComponent isOpen={props.isOpen}
                onConfirm={props.onConfirm}
                onCancel={props.onCancel}
                title={title}
                description={description}/>
    );
}