import { CommonFrame } from "../../../components/common/CommonFrame";

export function AdminFacilitiesPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER">
            <div className="adminFacilitiesPage">
                <h1>Facility Management</h1>
                <p>Admin controls for facility schedules and availability.</p>
            </div>
            </CommonFrame>
        </>
    );
}
