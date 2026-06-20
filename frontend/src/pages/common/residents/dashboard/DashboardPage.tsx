import type {CommonFrameType} from '../../../../app/types';
import {CommonFrame} from '../../../../components/common/CommonFrame';
import {RecentBookings} from "../../../../components/residents/laundryBookings/bookingHistory/UserBookings.tsx";
import Paper from "@mui/material/Paper";
import {List, ListItemText} from "@mui/material";

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
    return (
        <>
            <CommonFrame commonFrameType="RESIDENT"/>
            <div className="dashboardPage">
                <h1>Resident Dashboard</h1>
                <div className={"rent-due"}>
                    <strong>Rent Due</strong>
                    <p>$1420.00</p>
                </div>
                <div className={"recent-activity"}>
                    <strong>Recent activity</strong>
                    <RecentActivity/>
                </div>
                <div className={"upcoming-bookings"}>
                    <strong>Upcoming bookings</strong>
                    <RecentBookings/>
                </div>
            </div>
        </>
    )
}