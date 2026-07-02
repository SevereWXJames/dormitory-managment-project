import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type {CommonFrameType} from '../../../../app/types';
import {CommonFrame} from '../../../../components/common/CommonFrame';
import {RecentBookings} from "../../../../components/residents/laundryBookings/bookingHistory/UserBookings.tsx";
import Paper from "@mui/material/Paper";
import {List, ListItemText} from "@mui/material";
import { getUserId } from '../../../../context/authenticationSlice.ts';
import { fetchJson } from '../../../../utils/api.ts';
import type { CreditBalance } from '../../../../dataTypes/creditBalance.ts';
import type { Notice } from '../../../../dataTypes/notice.ts';
import type { ReservationSlot } from '../../../../dataTypes/reservationSlot.ts';

export interface DashboardProps {
    name: string,
    userType: CommonFrameType,
    credit_balance: number,
    recent_activity: object[],
    upcoming_bookings: object[],
}

export function RecentActivity() {
    return (
        <div>
            <Paper style={{maxHeight: 200, overflow: 'auto'}}>
                <List>
                    <ListItemText primary="Laundry-Booked - Washer 2, Jun 5, 10:00"/>
                    <ListItemText primary="Rent-payment confirmed - $1420"/>
                    <ListItemText primary="Notice: Water boiler repairs on 6 June"/>
                </List>
            </Paper>
        </div>)
}

export function DashboardPage() {
    const userId = useSelector(getUserId);
    const [creditBalance, setCreditBalance] = useState<CreditBalance | null>(null);
    const [bookings, setBookings] = useState<ReservationSlot[]>([]);
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDashboard = async () => {
            if (!userId) {
                setError("Resident is not authenticated.");
                setLoading(false);
                return;
            }

            try {
                const [balance, booked, userNotices] = await Promise.all([
                    fetchJson<CreditBalance>(`/credits/get-for-user/${encodeURIComponent(userId)}`),
                    fetchJson<ReservationSlot[]>(`/reservations/get-booked-by-user/${encodeURIComponent(userId)}`),
                    fetchJson<Notice[]>(`/notices/get-for-user/${encodeURIComponent(userId)}`),
                ]);

                setCreditBalance(balance);
                setBookings(booked);
                setNotices(userNotices);
            } catch (fetchError) {
                setError(fetchError instanceof Error ? fetchError.message : "Unable to load dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, [userId]);

    const formattedBalance = creditBalance ? `$${(creditBalance.balanceCents / 100).toFixed(2)}` : "N/A";

    return (
        <>
            <CommonFrame commonFrameType="RESIDENT"/>
            <div className="dashboardPage">
                <h1>Resident Dashboard</h1>
                {loading && <p>Loading dashboard data...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!loading && !error && (
                    <>
                        <div className={"rent-due"}>
                            <strong>Credit Balance</strong>
                            <p>{formattedBalance}</p>
                        </div>
                        <div className={"dashboard-summary"}>
                            <div><strong>Upcoming bookings</strong><p>{bookings.length}</p></div>
                            <div><strong>Notices</strong><p>{notices.length}</p></div>
                        </div>
                        <div className={"recent-activity"}>
                            <strong>Recent activity</strong>
                            <RecentActivity/>
                        </div>
                        <div className={"upcoming-bookings"}>
                            <strong>Upcoming bookings</strong>
                            <RecentBookings/>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

// import type {CommonFrameType} from '@/app/types.ts';
// import {CommonFrame} from '@/components/common/CommonFrame.tsx';
// import {
//     Card,
//     CardContent,
//     CardTitle,
// } from "@/components/ui/card"
//
// export interface DashboardProps {
//     name: string,
//     userType: CommonFrameType,
//     credit_balance: number,
//     recent_activity: object[],
//     upcoming_bookings: object[],
// }
//
// export function DashboardPage() {
//     return (
//         <>
//             <CommonFrame commonFrameType="RESIDENT">
//                 <div className="dashboardPage m-4 p-4 gap-4 flex flex-col text-left">
//                     <h2 className="!text-black" style={{ gridArea: "title" }}>Resident Dashboard</h2>
//                     <Card className="p-4 m-4" style={{gridArea: "finance-summary"}}>
//                         <CardTitle>Finance Summary</CardTitle>
//                         <CardContent className="flex flex-col">
//                             <strong>Application for Winter: Sept 2026</strong>
//                             <strong>Laundry Credit Balance: 400 credits</strong>
//                             <strong>Meal Card Balance: 300 credits</strong>
//                         </CardContent>
//                     </Card>
//                     <Card className="p-4 m-4"  style={{gridArea: "recent-activity"}}>
//                         <CardTitle>Recent Activity:</CardTitle>
//                         <CardContent className="flex flex-col">
//                             <strong>Laundry-Booked - Washer 2, Jun 5, 10:00</strong>
//                             <strong>Rent-payment confirmed - $1420</strong>
//                             <strong>Notice: Water boiler repairs on 6 June</strong>
//                         </CardContent>
//                     </Card>
//                     <Card className="p-4 m-4" style={{gridArea: "bookings"}}>
//                         <CardTitle>Reminders for upcoming bookings:</CardTitle>
//                     </Card>
//                 </div>
//             </CommonFrame>
//         </>
//     )
// }
