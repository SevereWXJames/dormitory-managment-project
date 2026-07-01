import { Box } from "@mui/material";
import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import { CreateMaintenanceRequestCard } from "../../../../../components/residents/maintenanceRequests/createMaintenanceRequestCard.tsx";
import { MaintenanceRequestHistoryCard } from "../../../../../components/residents/maintenanceRequests/MaintenanceRequestHistoryCard.tsx";

export interface MaintenanceRequestsProps {
    requests: object[]
}

export function MaintenanceRequestsPage() {
    return (
        <>
            <CommonFrame commonFrameType={"RESIDENT"}>
            <div className="maintenance-requests-page">
                <h1>Maintenance Requests</h1>
                <div className="flex flex-col md:flex-row">
                    <Box className="card-container">
                        <h2>Request History</h2>
                        <MaintenanceRequestHistoryCard />
                    </Box>
                    <Box className="card-container">
                        <h2>Create a new request</h2>
                        <CreateMaintenanceRequestCard />
                    </Box>
                </div>
            </div>
            </CommonFrame>
        </>
    );
}