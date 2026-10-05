import {useUserDashboardData} from "@/pages/common/residents/pageHooks/useUserDashboardData.tsx";
import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import {CommonFrame} from "@/components/common/CommonFrame.tsx";
import {UserBookingsTable} from "@/components/residents/facilitiesBooking/UserBookingsTable.tsx";

export function DashboardPage() {
    const {loading, isError, error, creditBalance} = useUserDashboardData();
    const formattedBalance = creditBalance ? `$${(creditBalance.balanceCents / 100).toFixed(2)}` : "N/A";

    return (
        <>
            <CommonFrame commonFrameType="RESIDENT">
                <div className="dashboardPage m-4 p-4 gap-4 flex flex-col text-left">
                    <h1>Resident Dashboard</h1>
                    {loading && <p>Loading dashboard data...</p>}
                    {isError && <p style={{color: "red"}}>{error}</p>}
                    {!loading && !isError && (
                        <>
                            <Card className="p-4 m-4" style={{gridArea: "finance-summary"}}>
                                <CardTitle>Finance Summary</CardTitle>
                                <CardContent className="flex flex-col">
                                    <strong>Laundry Credit Balance: {formattedBalance}</strong>
                                </CardContent>
                            </Card>
                            <Card className="p-4 m-4" style={{gridArea: "bookings"}}>
                                <CardTitle>Reminders for upcoming bookings:</CardTitle>
                                <UserBookingsTable caption={"Upcoming bookings"}/>
                            </Card>
                        </>
                    )}
                </div>
            </CommonFrame>
        </>
    )
}