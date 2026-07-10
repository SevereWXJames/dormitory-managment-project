import { useGetMaintenanceRequestByUserQuery } from "@/context/api/apiServices/maintenanceRequestApi";

/**
 * Hook that stores the local state of the “Maintenance History" card,
 * and makes and handles the API call to get all maintenance requests for this
 * user.
 * @returns All local React state variables, their set functions, and the
 * createMaintenanceRequest function.
 */
export function useMaintenanceRequestHistoryCard() {
	const data = useGetMaintenanceRequestByUserQuery("test1"); // Replace with correct user.
	const handleGetMaintenanceRequestsByUser = () => {
		try {
			return data; 
		} catch (error) {
			// Ideally there should be an error message shown in the front-end.
			console.error(error as Error);
		}
	}

	return {
		handleGetMaintenanceRequestsByUser
	};
}