/**
 * Hook that stores the local state of the “Create Maintenance Request” card
 * and makes the API call to create a maintenance request.
 * @returns All local React state variables, their set functions, and the
 * createMaintenanceRequest function.
 */
export function useCreateMaintenanceRequestCard() {
    const [priority, setPriority] = useState("");
    const [issueType, setIssueType] = useState("");
    const [issue, setIssue] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");



	return {
		priority, setPriority,
		issueType, setIssueType,
		issue, setIssue,
		location, setLocation,
		description, setDescription,
	}	
}