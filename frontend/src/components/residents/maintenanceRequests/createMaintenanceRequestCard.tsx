import {Button, Card, CardContent, FormControl, InputLabel, MenuItem, OutlinedInput, Select} from "@mui/material";
import {useDispatch} from "react-redux";
import {addMaintenanceRequest} from "../../../context/residents/maintenanceRequestsSlice";
import issues from "../../../assets/residents/placeholderData/maintenanceIssues.json";
import { useCreateMaintenanceRequestCard } from "./hooks/useCreateMaintenanceRequestCard";

/**
 * React components for the Create Maintenance Request card.
 *
 * @returns JSX for the Create Maintenance Request card.
 */

export function CreateMaintenanceRequestCard() {
    const priorityID = "priority";
    const issueTypeID = "issue-type";
    const issueID = "issue";
    const locationID = "location";
    const descriptionID = "description";

    const dispatch = useDispatch();
    const {
		priority, setPriority,
		issueType, setIssueType,
		issue, setIssue,
		location, setLocation,
		description, setDescription,
		handleCreateMaintenanceRequest
    } = useCreateMaintenanceRequestCard();

    const issueTypeMenuItems = issues.map((i) => <MenuItem value={i.category_id}>{i.category_name}</MenuItem>);
    const getIssueMenuItems = () => {
        const issuesByIssueType = issues.find((it) => it.category_id == issueType)?.issues;

        if (issuesByIssueType == null) {
            return [];
        }
        return issuesByIssueType.map((i) => <MenuItem value={i.id}>{i.name}</MenuItem>);
    }
    // Derived values — computed fresh each render, no
    const issueMenuItems = getIssueMenuItems();
    const isIssueDisabled = issueMenuItems.length === 0;
    const createMaintenanceRequest = () => {
        dispatch(addMaintenanceRequest({
            unit: "0", // Add correct unit number
            priority: priority,
            issue: issue,
            issueType: issueType,
            location: location,
            description: description
        }))
        handleCreateMaintenanceRequest();
    }

    return (
        <Card id="add-credits-card" className="card">
            <CardContent id="create-maintenance-request-card-content" className="flex flex-col items-center">
                <FormControl sx={{m: 1, width: '100%', maxWidth: '25ch'}} variant="filled">
                    <InputLabel htmlFor={`${priorityID}-input`}>Priority</InputLabel>
                    <Select
                        id={`${priorityID}-input`}
                        label="Priority"
                        value={priority}
                        onChange={(e) => setPriority((e.target as HTMLInputElement).value)}
                    >
                        <MenuItem value={"HIGH"}>High</MenuItem>
                        <MenuItem value={"MEDIUM"}>Medium</MenuItem>
                        <MenuItem value={"LOW"}>Low</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{m: 1, width: '100%', maxWidth: '25ch'}} variant="filled">
                    <InputLabel htmlFor={`${issueTypeID}-input`}>Issue type</InputLabel>
                    <Select
                        id={`${issueTypeID}-input`}
                        label="Issue type"
                        value={issueType}
                        onChange={(e) =>
                        {setIssueType((e.target as HTMLInputElement).value);
                            setIssue("")}}>
                        {issueTypeMenuItems}
                    </Select>
                </FormControl>
                <FormControl
                    sx={{m: 1, width: '100%', maxWidth: '25ch'}}
                    disabled={isIssueDisabled}
                    variant="filled">
                    <InputLabel htmlFor={`${issueID}-input`}>Issue</InputLabel>
                    <Select
                        id={`${issueID}-input`}
                        label="Issue"
                        value={issue}
                        onChange={(e) => setIssue((e.target as HTMLInputElement).value)}
                    >
                        {issueMenuItems}
                    </Select>
                </FormControl>
                <FormControl sx={{m: 1, width: '100%', maxWidth: '25ch'}} variant="filled">
                    <InputLabel htmlFor={`${locationID}-input`}>Location</InputLabel>
                    <OutlinedInput
                        id={`${locationID}-input`}
                        type='text'
                        label="Location"
                        onInput={(e) => setLocation((e.target as HTMLInputElement).value)}
                    />
                </FormControl>
                <FormControl sx={{m: 1, width: '100%', maxWidth: '50ch'}} variant="filled">
                    <InputLabel htmlFor={`${descriptionID}-input`}>Description</InputLabel>
                    <OutlinedInput
                        id={`${descriptionID}-input`}
                        type='text'
                        label="Description"
                        onInput={(e) => setDescription((e.target as HTMLInputElement).value)}
                    />
                </FormControl>
                <FormControl>
                    <Button id="open-nav-bar-button" sx={{width: 'fit-content'}} variant="contained"
                            onClick={createMaintenanceRequest}>Create maintenance request</Button>
                </FormControl>
            </CardContent>
        </Card>
    );
}