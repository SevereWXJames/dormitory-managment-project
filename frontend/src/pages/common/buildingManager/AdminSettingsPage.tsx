import { CommonFrame } from "../../../components/common/CommonFrame";

export function AdminSettingsPage() {
    return (
        <>
            <CommonFrame commonFrameType="BUILDING_MANAGER" />
            <div className="adminSettingsPage">
                <h1>Admin Settings</h1>
                <p>Building manager settings and preferences go here.</p>
            </div>
        </>
    );
}
