import * as chai from "chai";
// import chaiAsPromised from 'chai-as-promised';
import { getAllMaintenanceRequests, getAllMaintenanceRequestsByUserId, getMaintenanceRequestTypeById,
	getMaintenanceRequestStatusById, getMaintenanceRequestPriorityById, getAllMaintenanceRequestTypes,
	getAllMaintenanceRequestStatuses, getAllMaintenanceRequestPriorities, 
	addMaintenanceRequest,
	setMaintenanceRequest,
	setMaintenanceRequestPriority,
	setMaintenanceRequestStatus,
	getAdjacentMaintenanceRequestStatusId} 
	from "../../src/services/maintenanceRequestServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {connectMongo} from "../../src/database/database.ts";
import mongoose from "mongoose";

// chai.use(chaiAsPromised);

const expect = chai.expect;

describe("maintenanceRequestServices", function () {
	beforeEach(async function() {
		this.timeout(15000);
		await connectMongo(true);
		await loadSampleData();
	});

	// Get functions

	describe("getAdjacentMaintenanceRequestStatusId()", function () {
		it("returns the next status in order", function () {
			const statuses = [
				{ _id: "new", text: "New", order: 1 },
				{ _id: "investigating", text: "Investigating", order: 2 },
				{ _id: "done", text: "Done", order: 3 },
			];

			expect(getAdjacentMaintenanceRequestStatusId("new", statuses, "next")).to.equal("investigating");
			expect(getAdjacentMaintenanceRequestStatusId("investigating", statuses, "previous")).to.equal("new");
		});
	});

	describe("getAllMaintenanceRequests()", function () {
		it("Test", async function () {
			const expectedLength = 4;
			const actual = await getAllMaintenanceRequests();
			expect(actual).to.have.lengthOf(expectedLength);
		});
	});

	describe("getAllMaintenanceRequestsByUserId()", function () {
		it("userId with one maintenance request", async function () {
			const userId =  new mongoose.Types.ObjectId("507f191e810c19729de860eb");
			const actual = await getAllMaintenanceRequestsByUserId(userId);
			expect(actual).to.be.an.instanceOf(Array);
			expect(actual).to.have.lengthOf(1);
			expect(actual.some((req) => req.createdBy.equals("507f191e810c19729de860eb") && req.title === "title3" && req.description === "description description description" && req.type === "misc" && req.status === "completed" && req.priority === "prio0" && req.location === "Kitchen")).to.be.true;
		});
		it("userId with two maintenance requests", async function () {
			const userId = new mongoose.Types.ObjectId("507f191e810c19729de860ea");
			const expectedLength = 3;
			const actual = await getAllMaintenanceRequestsByUserId(userId);
			expect(actual).to.be.an.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
		});
		it("Absent userId", async function () {
			const userId = new mongoose.Types.ObjectId("000f189e810c19729de860ea");
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
			expect(actual).to.be.an.instanceOf(Array);
			expect(actual.some((status) => status._id === "completed" && status.text === "Completed")).to.be.true;
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
			const userId = new mongoose.Types.ObjectId("507f191e810c19729de860ee");
			const maintenanceRequest = {
				createdBy: userId,
				title: "New title",
				description: "New description",
				type: "New type",
				status: "new",
				priority: "prio0",
				location: null
			};

			try {
				await addMaintenanceRequest(maintenanceRequest);
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result).to.have.lengthOf(1);
				expect(result.some((req) => req.createdBy.equals("507f191e810c19729de860ee") && req.title === "New title" && req.description === "New description" && req.type === "New type" && req.status === "new" && req.priority === "prio0" && req.location === null)).to.be.true;
			} catch (e) {
				expect.fail((e as Error).message);
			}
		});

		it("Valid maintenanceRequest, with a non-null location", async function () {
			const userId = new mongoose.Types.ObjectId("507f191e810c19729de861ee");
			const maintenanceRequest = {
				createdBy: userId,
				title: "New title",
				description: "New description",
				type: "New type",
				status: "new",
				priority: "prio0",
				location: "New location"
			};

			try {
				await addMaintenanceRequest(maintenanceRequest);
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result).to.have.lengthOf(1);
				expect(result.some((req) => req.createdBy.equals("507f191e810c19729de861ee") && req.title === "New title" && req.description === "New description" && req.type === "New type" && req.status === "new" && req.priority === "prio0" && req.location === "New location")).to.be.true;
			} catch (e) {
				expect.fail((e as Error).message);
			}
		});

		it("Invalid maintenanceRequest: _id already exists", async function () {
			const initialUserId = new mongoose.Types.ObjectId("507f191e810c19729de862ed");
			const userId = new mongoose.Types.ObjectId("507f191e810c19729de862ee");
			const firstMaintenanceRequest = {
				_id: new mongoose.Types.ObjectId("507f191e810c19729de862ee"),
				createdBy: initialUserId,
				title: "New title",
				description: "New description",
				type: "New type",
				status: "new",
				priority: "prio0",
				location: null
			};
			try {
				await addMaintenanceRequest(firstMaintenanceRequest);
			}
			catch {
				expect.fail("should not error here");
			}

			const secondMaintenanceRequest = {
				_id: new mongoose.Types.ObjectId("507f191e810c19729de862ee"),
				createdBy: userId,
				title: "Second title",
				description: "New description",
				type: "New type",
				status: "new",
				priority: "prio0",
				location: null
			};

			try {
				await addMaintenanceRequest(secondMaintenanceRequest);
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
			const oldUserId = new mongoose.Types.ObjectId("507f191e810c19729de860ea");
			const newUserId = new mongoose.Types.ObjectId("507f191e810c19729de863ee");
			const existingRequests = await getAllMaintenanceRequestsByUserId(oldUserId);
			const existing = existingRequests.find((req) => req.title === "title1");
			if (!existing || !existing._id) {
				throw new Error("Expected an existing maintenance request for update test");
			}
			const id = existing._id;
			const newMaintenanceRequest = {
				_id: id,
				createdBy: newUserId,
				title: "new_title",
				description: "new description",
				type: "new_category",
				status: "new_status",
				priority: "new_priority",
				location: "new_location"
			};

			try {
				await setMaintenanceRequest(id, newMaintenanceRequest);
				const result = await getAllMaintenanceRequestsByUserId(newUserId);
				expect(result.some((req) => req.title === "new_title" && req.createdBy.equals("507f191e810c19729de863ee") && req.location === "new_location")).to.be.true;
			} catch (e) {
				expect.fail((e as Error).message);
			}
		});

		it("Valid maintenanceRequest, but absent _id", async function () {
			const id = new mongoose.Types.ObjectId("5071a91e810c19729de863ee");
			const userId = new mongoose.Types.ObjectId("507f191e810c19729de863ee");
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
			const userId = new mongoose.Types.ObjectId("507f191e810c19729de860ea");
			const existingRequests = await getAllMaintenanceRequestsByUserId(userId);
			const existing = existingRequests.find((req) => req.title === "title2");
			if (!existing || !existing._id) {
				throw new Error("Expected an existing maintenance request for invalid _id test");
			}
			const oldId = existing._id;
			const newId = new mongoose.Types.ObjectId("507f1f77bcf86cd799439012");
			const maintenanceRequest = {
				_id: newId,
				createdBy: userId,
				title: "title2",
				description: "description description description",
				type: "electrical",
				status: "inProgress",
				priority: "prio1",
				location: "Bedroom"
			};

			try {
				await setMaintenanceRequest(oldId, maintenanceRequest);
				expect.fail("setMaintenanceRequest() should have rejected");
			} catch (e) {
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result).to.not.deep.include(maintenanceRequest);
			}
		});
	});

	describe("setMaintenanceRequestPriority()", function () {
		it("Valid priority", async function () {
			const userId = new mongoose.Types.ObjectId("507f191e810c19729de860ea");
			const existingRequests = await getAllMaintenanceRequestsByUserId(userId);
			const existing = existingRequests.find((req) => req.title === "title2");
			if (!existing || !existing._id) {
				throw new Error("Expected an existing maintenance request for priority test");
			}
			const newPriority = "prio0";

			try {
				await setMaintenanceRequestPriority(existing._id, newPriority);
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result.some((req) => req._id && req._id.equals(existing._id) && req.priority === newPriority)).to.be.true;
			} catch (e) {
				expect.fail((e as Error).message);
			}
		});

		it("Invalid priority", async function () {
			const userId = new mongoose.Types.ObjectId("507f191e810c19729de860ea");
			const existingRequests = await getAllMaintenanceRequestsByUserId(userId);
			const existing = existingRequests.find((req) => req.title === "title2");
			if (!existing || !existing._id) {
				throw new Error("Expected an existing maintenance request for invalid priority test");
			}
			const newPriority = "not_a_priority";

			try {
				await setMaintenanceRequestPriority(existing._id, newPriority);
				expect.fail("setMaintenanceRequestPriority() should have rejected");
			} catch (e) {
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result.some((req) => req._id && req._id.equals(existing._id) && req.priority === newPriority)).to.be.false;
			}
		});
	});

	describe("setMaintenanceRequestStatus()", function () {
		it("Valid status", async function () {
			const userId = new mongoose.Types.ObjectId("507f191e810c19729de860ea");
			const existingRequests = await getAllMaintenanceRequestsByUserId(userId);
			const existing = existingRequests.find((req) => req.title === "title2");
			if (!existing || !existing._id) {
				throw new Error("Expected an existing maintenance request for status test");
			}
			const newStatus = "completed";

			try {
				await setMaintenanceRequestStatus(existing._id, newStatus);
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result.some((req) => req._id && req._id.equals(existing._id) && req.status === newStatus)).to.be.true;
			} catch (e) {
				expect.fail((e as Error).message);
			}
		});

		it("Invalid status", async function () {
			const userId = new mongoose.Types.ObjectId("507f191e810c19729de860ea");
			const existingRequests = await getAllMaintenanceRequestsByUserId(userId);
			const existing = existingRequests.find((req) => req.title === "title2");
			if (!existing || !existing._id) {
				throw new Error("Expected an existing maintenance request for invalid status test");
			}
			const newStatus = "not_a_status";

			try {
				await setMaintenanceRequestStatus(existing._id, newStatus);
				expect.fail("setMaintenanceRequestStatus() should have rejected");
			} catch (e) {
				const result = await getAllMaintenanceRequestsByUserId(userId);
				expect(result.some((req) => req._id && req._id.equals(existing._id) && req.status === newStatus)).to.be.false;
			}
		});
	});

});