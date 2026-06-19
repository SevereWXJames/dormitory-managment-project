import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import { CreateMaintenanceRequestCard } from "../../../../../components/residents/maintenanceRequests/createMaintenanceRequestCard.tsx";
import { MaintenanceRequestHistoryCard } from "../../../../../components/residents/maintenanceRequests/MaintenanceRequestHistoryCard.tsx";

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
                <MaintenanceRequestHistoryCard />
                <h1>Create a new request</h1>
                <CreateMaintenanceRequestCard />
            </div>
        </>
    );
}