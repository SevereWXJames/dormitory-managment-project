import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import * as React from "react";

type DialogStickyFooterProps = {
    DialogTrigger : React.ReactNode;
    title: string;
    content : React.ReactNode;
    description: string;
    DialogClose: React.ReactNode;
}

export function DialogStickyFooter(props : DialogStickyFooterProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {/*<Button variant="outline">Sticky Footer</Button>*/}
                {props.DialogTrigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{props.title}</DialogTitle>
                    <DialogDescription>
                        {props.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                    {props.content}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        {/*<Button variant="outline">Close</Button>*/}
                        {props.DialogClose}
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
