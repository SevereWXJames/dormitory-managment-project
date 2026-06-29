import {CommonFrame} from "@/components/common/CommonFrame.tsx";
import {MachineList} from "@/components/residents/facilitiesBooking/MachineList.tsx";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import {Link} from "react-router-dom";
import {BookingsTable} from "@/components/residents/facilitiesBooking/BookingsTable.tsx";

export function LaundryBookingsPage() {
    const rows = [
        {
            machineId: "machine 1",
            date: "Jan 01, 2026",
            startTime: "10:00 am",
            endTime: "11:00am",
            amountPaid: 100,
        },
        {
            machineId: "machine 2",
            date: "Jan 01, 2026",
            startTime: "1:00 pm",
            endTime: "2:00pm",
            amountPaid: 100,
        },
        {
            machineId: "machine 3",
            date: "Feb 02, 2026",
            startTime: "3:00 pm",
            endTime: "4:00pm",
            amountPaid: 100,
        },
    ]
    return (<>
        <CommonFrame commonFrameType={"RESIDENT"}/>

        <div className={"flex flex-wrap gap-4 p-4"}>
            <Card className="w-full max-w-sm p-4 text-left">
                <CardTitle>Book a machine:</CardTitle>
                <div className={"machineList"}>
                    <CardContent>
                        <MachineList/>
                    </CardContent>
                </div>
            </Card>

            <Card className="w-full max-w-sm p-3 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <strong>Credit Balance (credits):</strong>
                    <p className="m-0">100</p>
                </div>
                <Link to={"/credits"} className="font-semibold underline hover:opacity-70 transition-opacity flex-1 text-left">
                    <strong>Buy More Credits</strong>
                </Link>
            </Card>

            <Card className="flex-1 min-w-[300px]">
                <CardTitle>Upcoming bookings</CardTitle>
                <CardContent>
                    <BookingsTable rows={rows} caption={"Upcoming bookings"}/>
                </CardContent>
            </Card>

        </div>
    </>)
}