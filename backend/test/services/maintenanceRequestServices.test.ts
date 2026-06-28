import * as chai from "chai";
import chaiAsPromised from 'chai-as-promised';
import { getAllMaintenanceRequests, getAllMaintenanceRequestsByUserId, getMaintenanceRequestTypeById,
	getMaintenanceRequestStatusById, getMaintenanceRequestPriorityById, getAllMaintenanceRequestTypes,
	getAllMaintenanceRequestStatuses, getAllMaintenanceRequestPriorities } 
	from "../../src/services/maintenanceRequestServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";

chai.use(chaiAsPromised);

const expect = chai.expect;

describe("maintenanceRequestServices", function () {
	before(async function() {
		await loadSampleData();
	});

	describe("getAllMaintenanceRequests()", function () {
		it("Test", async function () {
			const expectedLength = 3;
			const actual = getAllMaintenanceRequests();
			expect(actual).to.eventually.have.lengthOf(expectedLength);
		});
	});

	describe("getAllMaintenanceRequestsByUserId()", function () {
		it("userId with one maintenance request", async function () {
			const userId = "user1";
			const expectedLength = 1;
			const expectedId = {id: "mR2"};
			const actual = getAllMaintenanceRequestsByUserId(userId);
			expect(actual).to.eventually.have.lengthOf(expectedLength);
			expect(actual).to.eventually.be.an.instanceOf(Array);
			expect(actual).to.eventually.deep.include(expectedId);
		});
		it("userId with two maintenance requests", async function () {
			const userId = "user0";
			const expectedLength = 2;
			const actual = getAllMaintenanceRequestsByUserId(userId);
			expect(actual).to.eventually.have.lengthOf(expectedLength);
			expect(actual).to.eventually.be.an.instanceOf(Array);
		});
		it("Absent userId", async function () {
			const userId = "not_a_user";
			const actual = getAllMaintenanceRequestsByUserId(userId);
			expect(actual).to.eventually.throw;
		});
	});

	describe("getMaintenanceRequestTypeById()", function () {
		it("Existing id", async function () {
			const id = "electrical";
			const requestTypeText = {text: "Electrical"};
			const actual = getMaintenanceRequestTypeById(id);
			expect(actual).to.eventually.deep.include(requestTypeText);
		});

		it("Absent id", async function () {
			const id = "not_a_request_type";
			const actual = getMaintenanceRequestTypeById(id);
			expect(actual).to.eventually.throw;
		});
	});

	describe("getMaintenanceRequestStatusById()", function () {
		it("Existing id", async function () {
			const id = "inProgress";
			const requestStatusText = {text: "In Progress"};
			const actual = getMaintenanceRequestStatusById(id);
			expect(actual).to.eventually.deep.include(requestStatusText);
		});

		it("Absent id", async function () {
			const id = "not_a_request_status";
			const actual = getMaintenanceRequestStatusById(id);
			expect(actual).to.eventually.throw;
		});
	});

	describe("getMaintenanceRequestPriorityById()", function () {
		it("Existing id", async function () {
			const id = "prio0";
			const requestPriorityText = {text: "Low"};
			const actual = getMaintenanceRequestPriorityById(id);
			expect(actual).to.eventually.deep.include(requestPriorityText);
		});

		it("Absent id", async function () {
			const id = "not_a_request_priority";
			const actual = getMaintenanceRequestPriorityById(id);
			expect(actual).to.eventually.throw;
		});
	});

	describe("getAllMaintenanceRequestTypes()", function () {
		it("Test", async function () {
			const actual = getAllMaintenanceRequestTypes();
			const expectedEntry = {id: "misc", text: "Miscellaneous"};
			expect(actual).to.eventually.deep.include(expectedEntry);
		});
	});

	describe("getAllMaintenanceRequestStatuses()", function () {
		it("Test", async function () {
			const actual = getAllMaintenanceRequestStatuses();
			const expectedEntry = {id: "completed", text: "Completed"};
			expect(actual).to.eventually.deep.include(expectedEntry);
		});
	});

	describe("getAllMaintenanceRequestPriorities()", function () {
		it("Test", async function () {
			const actual = getAllMaintenanceRequestPriorities();
			const expectedEntry = {id: "prio1", text: "Medium"};
			expect(actual).to.eventually.deep.include(expectedEntry);
		});
	});
});