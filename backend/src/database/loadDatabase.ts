import database from "./database.ts";
import creditBalanceJSON from "../../test_data/creditBalance.json" with {type: "json"};
import transactionHistoryJSON from "../../test_data/transactionHistory.json" with {type: "json"};
import requestJSON from "../../test_data/maintenanceRequest.json" with {type: "json"};
import requestTypeJSON from "../../test_data/maintenanceRequestType.json" with {type: "json"};
import requestStatusJSON from "../../test_data/maintenanceRequestStatus.json" with {type: "json"};
import requestPriorityJSON from "../../test_data/maintenanceRequestPriority.json" with {type: "json"};
import noticeJSON from "../../test_data/notices.json" with {type: "json"};
import reservationJSON from "../../test_data/reservationSlots.json" with {type: "json"};
import roomJSON from "../../test_data/rooms.json" with {type: "json"};
import residentJSON from "../../test_data/residents.json" with {type: "json"};
import serviceJSON from "../../test_data/services.json" with {type: "json"};

/**
 * Loads the sample data from the backend/test_data folder into the SmartAPT
 * database in MongoDB. If the database already exists in MongoDB, then it is
 * dropped and the data is loaded in again.
 * 
 * @returns A promise of void, which resolves if the data has been loaded into
 * the database correctly.
 */
export default function loadSampleData(): Promise<void> {
	console.debug("loadSampleData(): Loading sample data");

	return database.database.dropDatabase().then((value) =>
		Promise.all([database.load("credit_balances", creditBalanceJSON.creditBalances),
			database.load("transactions", transactionHistoryJSON.transactions),
			database.load("maintenance_requests", requestJSON.maintenanceRequests),
			database.load("maintenance_request_types", requestTypeJSON.maintenanceRequestTypes),
			database.load("maintenance_request_statuses", requestStatusJSON.maintenanceRequestStatuses),
			database.load("maintenance_request_priorities", requestPriorityJSON.maintenanceRequestPriorities),
			database.load("notices", noticeJSON.notices),
			database.load("reservation_slots", reservationJSON.reservationSlots),
			database.load("rooms", roomJSON.rooms),
			database.load("residents", residentJSON.residents),
			database.load("services", serviceJSON.services)])
		).then((value) => {
			Promise.resolve();
		})
		.catch((e) => {
			Promise.reject(`loadDatabase.ts: Error while loading sample data into MongoDB ${(e as Error).message}`);
		});
};