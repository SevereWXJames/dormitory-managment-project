import { Card, CardContent } from "@mui/material";
import { useSelector } from "react-redux";
import { getMaintenanceRequests } from "../../../context/residents/maintenanceRequestsSlice";
import {CardTitle} from "@/components/ui/card.tsx";
import {MaintenanceRequestTable} from "@/components/residents/maintenanceRequests/MaintenanceRequestTable.tsx";
import { useMaintenanceRequestHistoryCard } from "./hooks/useMaintenanceHistoryCard";
import type { MaintenanceRequest } from "@/dataTypes/maintenanceRequest";

/**
 * React components for the Maintenance Request History display.
 * 
 * @returns JSX for the Maintenance Request History card.
 */
export function MaintenanceRequestHistoryCard() {
    const requests = useSelector(getMaintenanceRequests);
    const {handleGetMaintenanceRequestsByUser} = useMaintenanceRequestHistoryCard();

    const getData = () => {
        const results = handleGetMaintenanceRequestsByUser();
        if (results === undefined) {
            return [];
        }
        return results.map((e: MaintenanceRequest) => {
            return {
                unit: "0", // Replace with correct unit number.
                status: e.status,
                priority: e.priority,
                issue: e.title,
                location: e.location,
                description: e.description
            };
        });
    }

    return (
        <Card id="maintenance-request-history-card" className="card text-left">
            <CardTitle>Past requests</CardTitle>
            <CardContent id="maintenance-request-history-card-content" className="flex flex-col">
                <MaintenanceRequestTable rows={getData()}/>
            </CardContent>
        </Card>
    );
}