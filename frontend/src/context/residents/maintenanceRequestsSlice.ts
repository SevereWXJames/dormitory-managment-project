import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { MaintenanceRequestPriority, MaintenanceRequestStatus } from '../../app/types';

type MaintenanceRequestSliceState = {
	maintenanceRequests: {
		id: number,
		unit: string,
		priority: MaintenanceRequestPriority,
		status: MaintenanceRequestStatus,
		issue: string,
		location: string,
		description: string
	}[];
}

const initialState: MaintenanceRequestSliceState = {
	maintenanceRequests: []
};

export const maintenanceRequestsSlice = createSlice({
	name: 'maintenanceRequests',
	initialState,
	reducers: {
		/**
		 * Adds a maintenance request to the Redux state.
		 * 
		 * @param state Current full Redux state.
		 * @param parameters An object with format {unit, priority,
		 * issueType, issue, location, description}
		 */
		addMaintenanceRequest: (state, parameters) => {
			const id = state.maintenanceRequests.length + 1;
			const unit = parameters.payload.unit;
			const priority = parameters.payload.priority;
			const status = "NEW";
			const issue = parameters.payload.issueType + " - " + parameters.payload.issue;
			const location = parameters.payload.location;
			const description = parameters.payload.description;

			state.maintenanceRequests.push({id, unit, priority, status, issue, location, description});
		}
	}
});

export const { addMaintenanceRequest } = maintenanceRequestsSlice.actions;

export const getMaintenanceRequests = (state: RootState) => {
	return state.maintenanceRequests.maintenanceRequests;
}

export default maintenanceRequestsSlice.reducer;