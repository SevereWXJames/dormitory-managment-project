import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import {MachineOptions} from "../../../../../components/residents/laundryBookings/MachineButtons.tsx";
import {ReservationForm} from "../../../../../components/residents/laundryBookings/reservationForm/ReservationForm.tsx";
import {
    CancelBookingButton
} from "../../../../../components/residents/laundryBookings/removeBookings/CancelBookingButton.tsx";
import {
    RecentBookings
} from "../../../../../components/residents/laundryBookings/bookingHistory/UserBookings.tsx";
import {
    CheckMachineStatus
} from "../../../../../components/residents/laundryBookings/reservationForm/CheckMachineStatus.tsx";
import { getUserId } from "../../../../../context/authenticationSlice.ts";
import { setBookings } from "../../../../../context/residents/bookingsSlice.ts";
import { fetchJson } from "../../../../../utils/api.ts";
import type { ReservationSlot } from "../../../../../dataTypes/reservationSlot.ts";
import type { Booking } from "../../../../../types/residents/types.tsx";

export type Bookings = {
    date: Date,
    start_time: string,
    end_time: string,
    machine_id: string,
    event_title: string,
}

export function LaundryMachinesList() {
    const machines: string[] = ["machine_1", "machine_2", "machine_3"]
    return (
        <div>
            <div className={"machine-options"}>
                <MachineOptions machine_ids={machines}/>
            </div>
            <div className={"check-machine-status"}>
                <strong>Check Machine status</strong>
                <CheckMachineStatus/>
            </div>
        </div>
    )
}

export function LaundryBookingsPage() {
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBookings = async () => {
            if (!userId) {
                setError("User is not authenticated.");
                setLoading(false);
                return;
            }

            try {
                const reservations = await fetchJson<ReservationSlot[]>(`/reservations/get-booked-by-user/${encodeURIComponent(userId)}`);
                const bookings: Booking[] = reservations.map((slot) => ({
                    _id: slot._id,
                    eventName: `Machine ${slot.serviceId}`,
                    serviceId: slot.serviceId,
                    booked: slot.booked,
                    bookedBy: slot.bookedBy,
                    startTime: new Date(slot.startTime * 1000).toISOString(),
                    date: new Date(slot.startTime * 1000).toLocaleDateString(),
                    durationSeconds: slot.durationSeconds,
                }));
                dispatch(setBookings(bookings));
            } catch (fetchError) {
                setError(fetchError instanceof Error ? fetchError.message : "Unable to load bookings.");
            } finally {
                setLoading(false);
            }
        };

        loadBookings();
    }, [userId, dispatch]);

    return (
        <>
            <CommonFrame commonFrameType={"RESIDENT"}/>
            <div className={"laundryBookingsPage"}>
                <div className="page-header">
                    <h1>Facilities</h1>
                    <p>Manage your laundry bookings and check machine availability.</p>
                </div>
                {loading && <p>Loading bookings...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!loading && !error && (
                    <div className={"contents"}>
                        <div className={"machineList"}>
                            <strong>Laundry Machines</strong>
                            <LaundryMachinesList/>
                        </div>
                        <div className={"bookingsColumn"}>
                            <div className={"bookingForm"}>
                                <strong>Make a booking</strong>
                                <ReservationForm/>
                            </div>
                            <div className={"cancel-booking"}>
                                <strong>Cancel a booking</strong>
                                <CancelBookingButton/>
                            </div>

                            <div className={"tables"}>
                                <div className={"recentBookings"}>
                                    <strong>Recent bookings</strong>
                                    <RecentBookings/>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}