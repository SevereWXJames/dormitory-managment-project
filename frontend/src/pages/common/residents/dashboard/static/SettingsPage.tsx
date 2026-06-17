import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";

export function SettingsPage() {
    return (
        <>
            <CommonFrame commonFrameType={"RESIDENT"}/>
            <div className="settingsPage">
                <h1>Change Password</h1>
                <h1>Manage Profile Details</h1>
                <h1>Toggle Notification Channels</h1>
            </div>
        </>
    )
}