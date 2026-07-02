import {useDispatch} from "react-redux";
import {CommonFrame} from "@/components/common/CommonFrame.tsx";
import {setBookings} from "@/context/residents/bookingsSlice.ts";
import {useLaundryBookingsData} from "@/pages/common/residents/pageHooks/useLaundryBookingsData.tsx";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import {MachineList} from "@/components/residents/facilitiesBooking/MachineList.tsx";
import {Link} from "react-router-dom";
import {BookingsTable} from "@/components/residents/facilitiesBooking/BookingsTable.tsx";

export type Bookings = {
    date: Date,
    start_time: string,
    end_time: string,
    machine_id: string,
    event_title: string,
}

export function LaundryBookingsPage() {
    const dispatch = useDispatch();
    const {bookings, isLoading, isError, error} = useLaundryBookingsData();

    if (!isLoading && isError && bookings) {
        dispatch(setBookings(bookings));
    }

    return (
        //     <>
        //         <CommonFrame commonFrameType={"RESIDENT"}/>
        //         <div className={"laundryBookingsPage"}>
        //             <div className="page-header">
        //                 <h1>Facilities</h1>
        //                 <p>Manage your laundry bookings and check machine availability.</p>
        //             </div>
        //             {isLoading && <p>Loading bookings...</p>}
        //             {error && <p style={{ color: "red" }}>{error}</p>}
        //             {!isLoading && !isError && (
        //                 <div className={"contents"}>
        //                     <div className={"machineList"}>
        //                         <strong>Laundry Machines</strong>
        //                         {/*<LaundryMachinesList/>*/}
        //                     </div>
        //                     <div className={"bookingsColumn"}>
        //                         <div className={"bookingForm"}>
        //                             <strong>Make a booking</strong>
        //                             {/*<ReservationForm/>*/}
        //                         </div>
        //                         <div className={"cancel-booking"}>
        //                             <strong>Cancel a booking</strong>
        //                             {/*<CancelBookingButton/>*/}
        //                         </div>
        //
        //                         <div className={"tables"}>
        //                             <div className={"recentBookings"}>
        //                                 <strong>Recent bookings</strong>
        //                                 {/*<RecentBookings/>*/}
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             )}
        //         </div>
        //     </>
        // )
        <CommonFrame commonFrameType={"RESIDENT"}>
            <div className="bento-grid grid grid-cols-1 md:grid-cols-[min-content_1fr] gap-4 p-4">
                {isLoading && <p>Loading bookings...</p>}
                {error && <p style={{color: "red"}}>{error}</p>}
                {!isLoading && !isError && bookings && (
                    <div className="contents">
                        <Card className="flex flex-col p-4 text-left" style={{gridArea: "book"}}>
                            <CardTitle>Book a machine:</CardTitle>
                            <div className={"machineList"}>
                                <CardContent className="flex flex-col">
                                    <MachineList/>
                                </CardContent>
                            </div>
                        </Card>

                        <Card className="p-3 flex flex-col gap-1 text-left" style={{gridArea: "credits"}}>
                            <div className="flex items-center gap-2">
                                <strong>Credit Balance (credits):</strong>
                                <p className="m-0">100</p>
                            </div>
                            <Link to={"/credits"}
                                  className="font-semibold underline hover:opacity-70 transition-opacity">
                                <strong>Buy More Credits</strong>
                            </Link>
                        </Card>

                        <Card style={{gridArea: "bookings"}}>
                            <CardTitle>Upcoming bookings</CardTitle>
                            <CardContent>
                                <BookingsTable rows={bookings} caption={"Upcoming bookings"}/>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </CommonFrame>
    )
}

