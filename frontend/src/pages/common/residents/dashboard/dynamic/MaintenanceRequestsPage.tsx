import { Box } from "@mui/material";
import { useDispatch} from "react-redux";
import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import { CreateMaintenanceRequestCard } from "../../../../../components/residents/maintenanceRequests/createMaintenanceRequestCard.tsx";
import { MaintenanceRequestHistoryCard } from "../../../../../components/residents/maintenanceRequests/MaintenanceRequestHistoryCard.tsx";
import { setMaintenanceRequests } from "../../../../../context/residents/maintenanceRequestsSlice.ts";
import { useMaintenanceRequestData } from "@/pages/common/residents/pageHooks/useMaintenanceRequestData.tsx";

export function MaintenanceRequestsPage() {
    const dispatch = useDispatch();
    const {requests, isLoading, isError, error} = useMaintenanceRequestData();
    if(!isLoading && !isError && requests){
        dispatch(setMaintenanceRequests(requests));
    }

    return (
        <>
            <CommonFrame commonFrameType={"RESIDENT"}>
            <div className="maintenance-requests-page">
                <h1>Maintenance Requests</h1>
                {isLoading && <p>Loading maintenance requests...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!isLoading && !isError && (
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
                )}
            </div>
            </CommonFrame>
        </>
    );
}
