import { CommonFrame } from "../../../components/common/CommonFrame";

export function AdminMaintenancePage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER" />
            <div className="adminMaintenancePage">
                <h1>Maintenance Requests</h1>
                <p>Admin view for reviewing and assigning maintenance tasks.</p>
            </div>
        </>
    );
}
