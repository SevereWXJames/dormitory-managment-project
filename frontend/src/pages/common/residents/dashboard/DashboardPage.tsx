import type {CommonFrameType} from '../../../../app/types';
import {CommonFrame} from '../../../../components/common/CommonFrame';
import Paper from "@mui/material/Paper";
import {List, ListItemText} from "@mui/material";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"

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
                <h2>Resident Dashboard</h2>
                <Card>
                    <CardTitle>Finances</CardTitle>
                    <CardContent>
                        <strong>Application for Winter: Sept 2026</strong>
                        <strong>Laundry Credit Balance: 400 credits</strong>
                        <strong>Meal Card Balance: 300 credits</strong>
                    </CardContent>
                </Card>
                <Card>
                    <CardTitle>Recent Activity:</CardTitle>
                    <CardContent>
                        <RecentActivity/>
                    </CardContent>
                </Card>
                <Card>
                    <CardTitle>Reminders for upcoming bookings:</CardTitle>
                </Card>
            </div>
        </>
    )
}