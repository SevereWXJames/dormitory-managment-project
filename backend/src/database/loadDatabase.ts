import {getConnection, load} from "./database.ts";
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
import userJSON from "../../test_data/users.json" with {type: "json"};
import IoTStatusJSON from "../../test_data/IoTStatus.json" with {type: "json"};
import {CreditBalanceModel, TransactionModel} from "../dataTypes/creditBalance.ts";
import {
	MaintenanceRequestModel,
	MaintenanceRequestPriorityModel, MaintenanceRequestStatusModel,
	MaintenanceRequestTypeModel
} from "../dataTypes/maintenanceRequest.ts";
import {NoticeModel} from "../dataTypes/notice.ts";
import {ReservationSlotModel} from "../dataTypes/reservationSlot.ts";
import {RoomModel} from "../dataTypes/room.ts";
import {ResidentModel, UserModel} from "../dataTypes/user.ts";
import {ServiceModel} from "../dataTypes/service.ts";
import {IoTStatusModel} from "../dataTypes/IoT/IoTStatus.ts";
import {hash} from "bcryptjs";

/**
 * Loads the sample data from the backend/test_data folder into the SmartAPT
 * database in MongoDB. If the database already exists in MongoDB, then it is
 * dropped and the data is loaded in again.
 * 
 * @returns A promise of void, which resolves if the data has been loaded into
 * the database correctly.
 */
export default async function loadSampleData(): Promise<void> {
	// console.debug("loadSampleData(): Loading sample data");

	try {
		await getConnection().dropDatabase();
		await Promise.all([load("CreditBalances", CreditBalanceModel, creditBalanceJSON.creditBalances),
			load("Transactions", TransactionModel, transactionHistoryJSON.transactions),
			load("MaintenanceRequests", MaintenanceRequestModel, requestJSON.maintenanceRequests),
			load("MaintenanceRequestTypes", MaintenanceRequestTypeModel, requestTypeJSON.maintenanceRequestTypes),
			load("MaintenanceRequestStatuses", MaintenanceRequestStatusModel, requestStatusJSON.maintenanceRequestStatuses),
			load("MaintenanceRequestPriorities", MaintenanceRequestPriorityModel, requestPriorityJSON.maintenanceRequestPriorities),
			load("Notices", NoticeModel, noticeJSON.notices),
			load("ReservationSlots", ReservationSlotModel, reservationJSON.reservationSlots),
			load("Rooms", RoomModel, roomJSON.rooms),
			load("Residents", ResidentModel, residentJSON.residents),
			load("Services", ServiceModel, serviceJSON.services),
			load("Users", UserModel, userJSON.users),
			load("IoTStatuses", IoTStatusModel, IoTStatusJSON.IoTStatuses)]);

		await handleSetPassword();
		// If sample data is being loaded, sample data already contains admin users.
		// Skip automatic creation of a default admin when LOAD_SAMPLE_DATA is enabled.
		if (!process.env.LOAD_SAMPLE_DATA) {
			await ensureAdminExists();
		}
	} catch (error) {
		throw Error(`Error loading the database! ${error}`);
	}
}

async function handleSetPassword() {
	const examplePassword = process.env.SAMPLE_PASSWORD;
	if (examplePassword !== undefined) {
		const hashedPassword = await hash(examplePassword, 10);
		await UserModel.updateMany({password: {$exists: false}}, {$set: {password: hashedPassword}});
	}
}

export async function ensureAdminExists(): Promise<void> {
	try {
		const admin = await UserModel.findOne({ roles: { $in: ["ADMIN"] } }).lean().exec();
		if (!admin) {
			// No ADMIN user found. Automatic default admin creation removed.
			console.warn("No ADMIN user found. Create an admin account or enable LOAD_SAMPLE_DATA.");
		}
	} catch (error) {
		throw Error(`Error ensuring admin exists: ${error}`);
	}
}