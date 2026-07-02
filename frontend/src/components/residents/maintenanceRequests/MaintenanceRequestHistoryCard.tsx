import { Card, CardContent } from "@mui/material";
import { useSelector } from "react-redux";
import { getMaintenanceRequests } from "../../../context/residents/maintenanceRequestsSlice";
import {CardTitle} from "@/components/ui/card.tsx";
import {MaintenanceRequestTable} from "@/components/residents/maintenanceRequests/MaintenanceRequestTable.tsx";

/**
 * React components for the Maintenance Request History display.
 * 
 * @returns JSX for the Maintenance Request History card.
 */
export function MaintenanceRequestHistoryCard() {
    const requests = useSelector(getMaintenanceRequests);

    return (
        <Card id="maintenance-request-history-card" className="card text-left">
            <CardTitle>Past requests</CardTitle>
            <CardContent id="maintenance-request-history-card-content" className="flex flex-col">
                <MaintenanceRequestTable rows={requests}/>
            </CardContent>
        </Card>
    );
}