import { CommonFrame } from "../../../components/common/CommonFrame";

export function AdminResidentsPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER" />
            <div className="adminResidentsPage">
                <h1>Residents Management</h1>
                <p>Admin tools for viewing and managing resident information.</p>
            </div>
        </>
    );
}
