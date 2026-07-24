import { usePutMutation } from "@/context/api/apiServices/maintenanceRequestApi";
import { getUserId } from "@/context/authenticationSlice";
import type { MaintenanceRequest } from "@/dataTypes/maintenanceRequest";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

/**
 * Hook that stores the local state of the “Create Maintenance Request” card,
 * and makes and handles the API call to create a maintenance request.
 * @returns All local React state variables, their set functions, and the
 * createMaintenanceRequest function.
 */
export function useCreateMaintenanceRequestCard() {
	// State
    const [priority, setPriority] = useState("");
    const [issueType, setIssueType] = useState("");
    const [issue, setIssue] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
	const [successSnackbar, setSuccessSnackbar] = useState(false); // Visibility state of the “Created maintenance request successfully" snackbar
	const [failureSnackbar, setFailureSnackbar] = useState(false); // Visibility of the "Error while creating maintenance request" snackbar
	
	// Redux
	const [put] = usePutMutation();
	const userId = useSelector(getUserId);

	// Errors
	const priorityError = useMemo(() => priority.length === 0, [priority]);
	const issueTypeError = useMemo(() => issueType.length === 0, [issueType]);
	const issueError = useMemo(() => issue.length === 0, [issue]);
	const formError = useMemo(() => priorityError || issueTypeError || issueError, [priorityError, issueTypeError, issueError]);

	const handleCreateMaintenanceRequest = async () => {
		try {
			await put({
				createdBy: userId,
				title: issue,
				description: description,
				type: issueType,
				status: "new",
				priority: priority,
				location: location,
			} as MaintenanceRequest);

			setSuccessSnackbar(true);
			setFailureSnackbar(false);

		} catch (error) {
			// Ideally there should be an error message shown in the front-end.
			console.error(error as Error);
			setSuccessSnackbar(false);
			setFailureSnackbar(true);
		}
	}

	const handleCloseSuccessSnackbar = () => {
        setSuccessSnackbar(false);
    }

    const handleCloseFailureSnackbar = () => {
        setFailureSnackbar(false);
    }

	return {
		priority, setPriority,
		issueType, setIssueType,
		issue, setIssue,
		location, setLocation,
		description, setDescription,
		handleCreateMaintenanceRequest,
		priorityError,
		issueTypeError,
		issueError,
		formError,
		successSnackbar,
        handleCloseSuccessSnackbar,
        failureSnackbar,
        handleCloseFailureSnackbar
	}	
}