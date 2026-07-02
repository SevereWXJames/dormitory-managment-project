import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {CommonFrame} from "../../../../../components/common/CommonFrame.tsx";
import { CreateMaintenanceRequestCard } from "../../../../../components/residents/maintenanceRequests/createMaintenanceRequestCard.tsx";
import { MaintenanceRequestHistoryCard } from "../../../../../components/residents/maintenanceRequests/MaintenanceRequestHistoryCard.tsx";
import { getUserId } from "../../../../../context/authenticationSlice.ts";
import { setMaintenanceRequests } from "../../../../../context/residents/maintenanceRequestsSlice.ts";
import { fetchJson } from "../../../../../utils/api.ts";
import type { MaintenanceRequest } from "../../../../../dataTypes/maintenanceRequest.ts";

export interface MaintenanceRequestsProps {
    requests: object[]
}

export function MaintenanceRequestsPage() {
    const userId = useSelector(getUserId);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadRequests = async () => {
            if (!userId) {
                setError("User is not authenticated.");
                setLoading(false);
                return;
            }

            try {
                const requests = await fetchJson<MaintenanceRequest[]>(`/maintenance-request/get-for-user/${encodeURIComponent(userId)}`);
                dispatch(setMaintenanceRequests(requests.map((request) => ({
                    id: request._id,
                    unit: request.location ?? "N/A",
                    priority: (request.priority?.toUpperCase() === "HIGH" || request.priority?.toUpperCase() === "MEDIUM" || request.priority?.toUpperCase() === "LOW"
                        ? request.priority.toUpperCase() as "HIGH" | "MEDIUM" | "LOW"
                        : "LOW"),
                    status: request.status?.toLowerCase() === "completed" ? "COMPLETED" : request.status?.toLowerCase() === "inprogress" ? "IN PROGRESS" : "NEW",
                    issue: request.title,
                    location: request.location ?? "N/A",
                    description: request.description,
                }))));
            } catch (fetchError) {
                setError(fetchError instanceof Error ? fetchError.message : "Unable to load maintenance requests.");
            } finally {
                setLoading(false);
            }
        };

        loadRequests();
    }, [userId, dispatch]);

    return (
        <>
            <CommonFrame commonFrameType={"RESIDENT"}/>
            <div className="maintenance-requests-page">
                <h1>Maintenance Requests</h1>
                {loading && <p>Loading maintenance requests...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!loading && !error && (
                    <>
                        <Box className="card-container">
                            <h2>Request History</h2>
                            <MaintenanceRequestHistoryCard />
                        </Box>
                        <Box className="card-container">
                            <h2>Create a new request</h2>
                            <CreateMaintenanceRequestCard />
                        </Box>
                    </>
                )}
            </div>
        </>
    );
}