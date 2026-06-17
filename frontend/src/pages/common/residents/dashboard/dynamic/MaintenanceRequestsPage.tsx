import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";

export interface MaintenanceRequestsProps {
    requests: object[]
}

export function MaintenanceRequestsPage() {
    return (
        <>
            <CommonFrame commonFrameType={"RESIDENT"}/>
            <div className="maintenanceRequestsPage">
                <h1>Maintenance Requests</h1>
                <h1>Request History</h1>
                <h1>Create a new request</h1>
            </div>
        </>
    );
}