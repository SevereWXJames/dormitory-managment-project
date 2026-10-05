import {MoreHorizontalIcon} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useRowDropDown} from "@/components/residents/facilitiesBooking/hooks/useRowDropDown.tsx";
import type {Booking} from "@/types/residents/types.ts";
import {CancelBookingDialog} from "@/components/residents/facilitiesBooking/CancelBookingDialog.tsx";

type RowDropDownProps = {
    bookingInfo : Booking;
}
export function RowDropDown(props : RowDropDownProps) {
    const {onCancel, confirmCancel, isConfirmOpen, cancelDialogClose} = useRowDropDown(props);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon/>
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem variant="destructive" onClick={onCancel}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <CancelBookingDialog isOpen={isConfirmOpen} onConfirm={confirmCancel} onCancel={cancelDialogClose}/>
        </>
    )
}