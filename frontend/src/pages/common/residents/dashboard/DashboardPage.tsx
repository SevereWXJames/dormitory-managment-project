import type { CommonFrameType } from '../../../../app/types';
import { CommonFrame } from '../../../../components/common/CommonFrame';
export interface DashboardProps {
    name: string,
    userType: CommonFrameType,
    credit_balance: number,
    recent_activity: object,
    upcoming_bookings: object,
}

export function DashboardPage() {
    return (
        <>
        <CommonFrame userType="RESIDENT"/>
            <div className="dashboardPage">
                <h1>Resident Dashboard</h1>
            </div>
        </>
    )
}