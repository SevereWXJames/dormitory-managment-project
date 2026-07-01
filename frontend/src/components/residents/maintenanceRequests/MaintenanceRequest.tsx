import { Box } from "@mui/material";
import { useId } from "react";
import type { MaintenanceRequestPriority, MaintenanceRequestStatus } from "../../../app/types";

export type MaintenanceRequestsProps = {
	unit: string,
	status: MaintenanceRequestStatus;
	priority: MaintenanceRequestPriority;
	issue: string,
	location: string,
	description: string
}

/**
 * React component for a single maintenance request item
 * 
 * @returns JSX for a maintenance request item.
 */
export function MaintenanceRequest(props: MaintenanceRequestsProps) {
	const id = "maintenance-request-" + useId();

	return (
		<Box id={id} className="flex flex-row p-4 gap-4">
			<div className="maintenance-request-title">Unit {props.unit}</div>
			<div className="maintenance-request-status">Status: {props.status}</div>
			<div className="maintenance-request-priority">Priority: {props.priority}</div>
			<div className="maintenance-request-field">Issue: {props.issue}</div>
			<div className="maintenance-request-field">Location: {props.location}</div>
			<div className="maintenance-request-field">Description: {props.description}</div>
		</Box>
	);
}