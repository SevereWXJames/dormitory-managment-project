import * as chai from "chai";
// import chaiAsPromised from 'chai-as-promised';
import { getAllMaintenanceRequests, getAllMaintenanceRequestsByUserId, getMaintenanceRequestTypeById,
	getMaintenanceRequestStatusById, getMaintenanceRequestPriorityById, getAllMaintenanceRequestTypes,
	getAllMaintenanceRequestStatuses, getAllMaintenanceRequestPriorities, 
	addMaintenanceRequest,
	setMaintenanceRequest,
	setMaintenanceRequestPriority,
	setMaintenanceRequestStatus} 
	from "../../src/services/maintenanceRequestServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {connectMongo} from "../../src/database/database.ts";

// chai.use(chaiAsPromised);

const expect = chai.expect;

describe("maintenanceRequestServices", function () {
	beforeEach(async function() {
		this.timeout(15000);
		await connectMongo(true);
		await loadSampleData();
	});

	// Get functions

	describe("getAllMaintenanceRequests()", function () {
		it("Test", async function () {
			const expectedLength = 3;
			const actual = await getAllMaintenanceRequests();
			expect(actual).to.have.lengthOf(expectedLength);
		});
	});

	describe("getAllMaintenanceRequestsByUserId()", function () {
		it("userId with one maintenance request", async function () {
			const userId = "user1";
			const expectedLength = 1;
			const expectedMaintenanceRequest = {
				"_id": "mR2",
				"createdBy": "user1",
				"title": "title3",
				"description": "description description description",
				"type": "misc",
				"status": "completed",
				"priority": "prio0",
				"location": "Kitchen"
			};
			const actual = await getAllMaintenanceRequestsByUserId(userId);
			expect(actual).to.have.lengthOf(expectedLength);
			expect(actual).to.be.an.instanceOf(Array);
			expect(actual[0]).to.deep.equal(expectedMaintenanceRequest);
		});
		it("userId with two maintenance requests", async function () {
			const userId = "user0";
			const expectedLength = 2;
			const actual = await getAllMaintenanceRequestsByUserId(userId);
			expect(actual).to.be.an.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
		});
		it("Absent userId", async function () {
			const userId = "not_a_user";
			const actual = await getAllMaintenanceRequestsByUserId(userId);
			expect(actual).to.be.an.instanceOf(Array);
			expect(actual).to.be.empty;
		});
	});

	describe("getMaintenanceRequestTypeById()", function () {
		it("Existing id", async function () {
			const id = "electrical";
			const requestTypeText = {text: "Electrical"};
			const actual = await getMaintenanceRequestTypeById(id);
			expect(actual).to.deep.include(requestTypeText);
		});

		it("Absent id", async function () {
			const id = "not_a_request_type";
			const actual = await getMaintenanceRequestTypeById(id);
			expect(actual).to.be.undefined;
		});
	});

	describe("getMaintenanceRequestStatusById()", function () {
		it("Existing id", async function () {
			const id = "inProgress";
			const requestStatusText = {text: "In Progress"};
			const actual = await getMaintenanceRequestStatusById(id);
			expect(actual).to.deep.include(requestStatusText);
		});

		it("Absent id", async function () {
			const id = "not_a_request_status";
			const actual = await getMaintenanceRequestStatusById(id);
			expect(actual).to.be.undefined;
		});
	});

	describe("getMaintenanceRequestPriorityById()", function () {
		it("Existing id", async function () {
			const id = "prio0";
			const requestPriorityText = {text: "Low"};
			const actual = await getMaintenanceRequestPriorityById(id);
			expect(actual).to.deep.include(requestPriorityText);
		});

		it("Absent id", async function () {
			const id = "not_a_request_priority";
			const actual = await getMaintenanceRequestPriorityById(id);
			expect(actual).to.be.undefined;
		});
	});

	describe("getAllMaintenanceRequestTypes()", function () {
		it("Test", async function () {
			const actual = await getAllMaintenanceRequestTypes();
			const expectedEntry = {_id: "misc", text: "Miscellaneous"};
			expect(actual).to.be.an.instanceOf(Array);
			expect(actual).to.deep.include(expectedEntry);
		});
	});

	describe("getAllMaintenanceRequestStatuses()", function () {
		it("Test", async function () {
			const actual = await getAllMaintenanceRequestStatuses();
			const expectedEntry = {_id: "completed", text: "Completed"};
			expect(actual).to.be.an.instanceOf(Array);
			expect(actual).to.deep.include(expectedEntry);
		});
	});

	describe("getAllMaintenanceRequestPriorities()", function () {
		it("Test", async function () {
			const actual = await getAllMaintenanceRequestPriorities();
			const expectedEntry = {_id: "prio1", text: "Medium"};
			expect(actual).to.be.an.instanceOf(Array);
			expect(actual).to.deep.include(expectedEntry);
		});
	});

	// Add and set functions

	describe("addMaintenanceRequest()", function () {
		it("Valid maintenanceRequest, with a null location", async function () {
			const userId = "new_user1";
			const maintenanceRequest = {
				_id: "new_valid_request0",
				createdBy: userId,
				title: "New title",
				description: "New description",
				type: "New type",
				status: "new",
				priority: "prio0",
				location: null,
				__v: 0
			};

			try {
				await addMaintenanceRequest(maintenanceRequest);
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result).to.have.lengthOf(1);
				expect(result).to.deep.include(maintenanceRequest);
			} catch (e) {
				expect.fail((e as Error).message);
			}
		});

		it("Valid maintenanceRequest, with a non-null location", async function () {
			const userId = "new_user2";
			const maintenanceRequest = {
				_id: "new_valid_request1",
				createdBy: userId,
				title: "New title",
				description: "New description",
				type: "New type",
				status: "new",
				priority: "prio0",
				location: "New location",
			};
			const expected = {
				_id: "new_valid_request1",
				createdBy: userId,
				title: "New title",
				description: "New description",
				type: "New type",
				status: "new",
				priority: "prio0",
				location: "New location",
				__v: 0
			};

			try {
				await addMaintenanceRequest(maintenanceRequest);
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result).to.have.lengthOf(1);
				expect(result).to.deep.include(expected);
			} catch (e) {
				expect.fail((e as Error).message);
			}
		});

		it("Invalid maintenanceRequest: _id already exists", async function () {
			const userId = "new_user3";
			const maintenanceRequest = {
				_id: "mR0",
				createdBy: userId,
				title: "New title",
				description: "New description",
				type: "New type",
				status: "new",
				priority: "prio0",
				location: null
			}

			try {
				await addMaintenanceRequest(maintenanceRequest);
				expect.fail("addMaintenanceRequest() should not have resolved.");
			} catch (e) {
				// addMaintenanceRequest() is expected to reject.
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result).to.have.lengthOf(0);
			}
		});
	});

	describe ("setMaintenanceRequest", function () {
		it("Valid maintenanceRequest, with a present _id", async function () {
			const id = "mR0";
			const newUserId = "new_user";
			const oldMaintenanceRequest = {
				"_id": id,
				"createdBy": "user0",
				"title": "title1",
				"description": "description description description",
				"type": "plumbing",
				"status": "new",
				"priority": "prio2",
				"location": null
			};
			const newMaintenanceRequest = {
				"_id": id,
				"createdBy": newUserId,
				"title": "new_title",
				"description": "new description",
				"type": "new_category",
				"status": "new_status",
				"priority": "new_priority",
				"location": "new_location"
			};

			try {
				await setMaintenanceRequest(id, newMaintenanceRequest);
				const result = await getAllMaintenanceRequestsByUserId(newUserId);
				expect(result).to.deep.include(newMaintenanceRequest);
				expect(result).to.not.deep.include(oldMaintenanceRequest);
			} catch (e) {
				expect.fail((e as Error).message);
			}
		});

		it("Valid maintenanceRequest, but absent _id", async function () {
			const id = "not_a_maintenance_request";
			const userId = "user1";
			const maintenanceRequest = {
				"_id": id,
				"createdBy": userId,
				"title": "title3",
				"description": "description description description",
				"type": "misc",
				"status": "completed",
				"priority": "prio0",
				"location": null
			};

			try {
				await setMaintenanceRequest(id, maintenanceRequest);
				expect.fail("setMaintenanceRequest() should have rejected");
			} catch (e) {
				// setMaintenanceRequest() is expected to reject.
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result).to.not.deep.include(maintenanceRequest);
			}
		});

		it("Invalid maintenanceRequest: Attempt to set a new _id", async function () {
			const oldId = "mR1";
			const newId = "new_id";
			const userId = "user0";
			const maintenanceRequest = {
				"_id": newId,
				"createdBy": userId,
				"title": "title2",
				"description": "description description description",
				"type": "electrical",
				"status": "inProgress",
				"priority": "prio1",
				"location": "Bedroom"
			}

			try {
				await setMaintenanceRequest(oldId, maintenanceRequest);
				expect.fail("setMaintenanceRequest() should have rejected");
			} catch (e) {
				// setMaintenanceRequest() is expected to reject.
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result).to.not.deep.include(maintenanceRequest);
			}
		});
	});

	describe("setMaintenanceRequestPriority()", function () {
		it("Valid priority", async function () {
			const id = "mR1";
			const userId = "user0";
			const newPriority = "prio0";
			const original = {
				"_id": "mR1",
				"createdBy": userId,
				"title": "title2",
				"description": "description description description",
				"type": "electrical",
				"status": "inProgress",
				"priority": "prio1",
				"location": "Bedroom"
			};
			const expected = {
				"_id": "mR1",
				"createdBy": userId,
				"title": "title2",
				"description": "description description description",
				"type": "electrical",
				"status": "inProgress",
				"priority": newPriority,
				"location": "Bedroom",
			};

			try {
				await setMaintenanceRequestPriority(id, newPriority);
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result).to.deep.include(expected);
				expect(result).to.not.deep.include(original);
			} catch (e) {
				expect.fail((e as Error).message);
			}
		});

		it("Invalid priority", async function () {
			const id = "mR1";
			const userId = "user0";
			const newPriority = "not_a_priority";
			const notExpected = {
				"_id": "mR1",
				"createdBy": userId,
				"title": "title2",
				"description": "description description description",
				"type": "electrical",
				"status": "inProgress",
				"priority": newPriority,
				"location": "Bedroom"
			};

			try {
				await setMaintenanceRequestPriority(id, newPriority);
				expect.fail("setMaintenanceRequestPriority() should have rejected");
			} catch (e) {
				// setMaintenanceRequestPriority() is expected to reject.
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result).to.not.deep.include(notExpected);
			}
		});
	});

	describe("setMaintenanceRequestStatus()", function () {
		it("Valid status", async function () {
			const id = "mR1";
			const userId = "user0";
			const newStatus = "completed";
			const original = {
				"_id": "mR1",
				"createdBy": userId,
				"title": "title2",
				"description": "description description description",
				"type": "electrical",
				"status": "inProgress",
				"priority": "prio1",
				"location": "Bedroom"
			};
			const expected = {
				"_id": "mR1",
				"createdBy": userId,
				"title": "title2",
				"description": "description description description",
				"type": "electrical",
				"status": newStatus,
				"priority": "prio1",
				"location": "Bedroom",
			};

			try {
				await setMaintenanceRequestStatus(id, newStatus);
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result).to.deep.include(expected);
				expect(result).to.not.deep.include(original);
			} catch (e) {
				expect.fail((e as Error).message);
			}
		});

		it("Invalid status", async function () {
			const id = "mR1";
			const userId = "user0";
			const newStatus = "not_a_status";
			const notExpected = {
				"_id": "mR1",
				"createdBy": userId,
				"title": "title2",
				"description": "description description description",
				"type": "electrical",
				"status": newStatus,
				"priority": "prio1",
				"location": "Bedroom",
				"__v": 0
			};

			try {
				await setMaintenanceRequestStatus(id, newStatus);
				expect.fail("setMaintenanceRequestStatus() should have rejected");
			} catch (e) {
				// setMaintenanceRequestStatus() is expected to reject.
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result).to.not.deep.include(notExpected);
			}
		});
	});

});