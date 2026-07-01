import type {CommonFrameType} from '@/app/types.ts';
import {CommonFrame} from '@/components/common/CommonFrame.tsx';
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

export function DashboardPage() {
    return (
        <>
            <CommonFrame commonFrameType="RESIDENT">
            <div className="dashboardPage m-4 p-4 gap-4 flex flex-col text-left">
                <h2 className="!text-black" style={{ gridArea: "title" }}>Resident Dashboard</h2>
                <Card className="p-4 m-4" style={{gridArea: "finance-summary"}}>
                    <CardTitle>Finance Summary</CardTitle>
                    <CardContent className="flex flex-col">
                        <strong>Application for Winter: Sept 2026</strong>
                        <strong>Laundry Credit Balance: 400 credits</strong>
                        <strong>Meal Card Balance: 300 credits</strong>
                    </CardContent>
                </Card>
                <Card className="p-4 m-4"  style={{gridArea: "recent-activity"}}>
                    <CardTitle>Recent Activity:</CardTitle>
                    <CardContent className="flex flex-col">
                        <strong>Laundry-Booked - Washer 2, Jun 5, 10:00</strong>
                        <strong>Rent-payment confirmed - $1420</strong>
                        <strong>Notice: Water boiler repairs on 6 June</strong>
                    </CardContent>
                </Card>
                <Card className="p-4 m-4" style={{gridArea: "bookings"}}>
                    <CardTitle>Reminders for upcoming bookings:</CardTitle>
                </Card>
            </div>
            </CommonFrame>
        </>
    )
}