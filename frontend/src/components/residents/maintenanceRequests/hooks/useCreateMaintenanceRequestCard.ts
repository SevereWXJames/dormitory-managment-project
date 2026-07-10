import { useGetMaintenanceRequestByUserQuery, usePutMutation } from "@/context/api/apiServices/maintenanceRequestApi";
import type { MaintenanceRequest } from "@/dataTypes/maintenanceRequest";
import { useState } from "react";

/**
 * Hook that stores the local state of the “Create Maintenance Request” card,
 * and makes and handles the API call to create a maintenance request.
 * @returns All local React state variables, their set functions, and the
 * createMaintenanceRequest function.
 */
export function useCreateMaintenanceRequestCard() {
    const [priority, setPriority] = useState("");
    const [issueType, setIssueType] = useState("");
    const [issue, setIssue] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
	const [put] = usePutMutation();

	const handleCreateMaintenanceRequest = async () => {
		try {
			await put({
				createdBy: "test1", // Replace this with correct user.
				title: issue,
				description: description,
				type: issueType,
				status: "new",
				priority: priority,
				location: location,
			} as MaintenanceRequest);
		} catch (error) {
			// Ideally there should be an error message shown in the front-end.
			console.error(error as Error);
		}
	}

	return {
		priority, setPriority,
		issueType, setIssueType,
		issue, setIssue,
		location, setLocation,
		description, setDescription,
		handleCreateMaintenanceRequest
	}	
}