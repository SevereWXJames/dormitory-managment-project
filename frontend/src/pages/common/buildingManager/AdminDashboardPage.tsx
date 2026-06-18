import { CommonFrame } from "../../../components/common/CommonFrame";

export function AdminDashboardPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER" />
            <div className="adminDashboardPage">
                <h1>Building Manager Dashboard</h1>
                <p>Admin summary and high-level metrics appear here.</p>
            </div>
        </>
    );
}
