import { MaintenanceRequest } from "./MaintenanceRequest";

import { Card, CardContent } from "@mui/material";
import { useSelector } from "react-redux";
import { getMaintenanceRequests } from "../../../context/residents/maintenanceRequestsSlice";

/**
 * React components for the Maintenance Request History display.
 * 
 * @returns JSX for the Maintenance Request History card.
 */
export function MaintenanceRequestHistoryCard() {
	const requests = useSelector(getMaintenanceRequests);
	const requestsElems = requests.map((r) =>
		<MaintenanceRequest key={r.id} unit={r.unit} priority={r.priority} status={r.status} issue={r.issue} location={r.location} description={r.description} />
	);

	return (
		<Card id="maintenance-request-history-card" className="card">
			<CardContent id="maintenance-request-history-card-content">
				{requestsElems}
			</CardContent>
		</Card>
	);
}