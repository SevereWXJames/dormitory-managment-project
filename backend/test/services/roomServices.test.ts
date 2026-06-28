import * as chai from "chai";
import chaiAsPromised from 'chai-as-promised';
import { getAllRooms, getRoomById, getRoomByUserId, getAllResidents, getResidentByUserId }
	from "../../src/services/roomServices.ts";
import { Room } from "../../src/dataTypes/room.ts";
import { Resident } from "../../src/dataTypes/user.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";

chai.use(chaiAsPromised);

const expect = chai.expect;

describe("roomServices", function () {
	before(async function() {
		await loadSampleData();
	});

	describe("getAllRooms()", function () {
		it("Test", async function () {
			const expectedLength = 3;
			const expectedRoom = {
				"id": "room1",
				"roomName": "test-unit-2",
				"verificationCode": "abcd"
			};
			const actual = await getAllRooms();
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
			expect(actual).to.deep.include(expectedRoom);
		});
	});

	describe("getRoomById()", function () {
		it("Existing id", async function () {
			const id = "room0";
			const expectedRoom = {
				"id": "room0",
				"roomName": "test-unit-1",
				"verificationCode": "abcd"
			};
			const actual = await getRoomById(id);
			expect(actual).to.be.instanceOf(Room);
			expect(actual).to.deep.equal(expectedRoom);
			expect(actual).to.not.be.undefined;
		});
		it("Absent id", async function () {
			const id = "not_a_room";
			const actual = await getRoomById(id);
			expect(actual).to.be.undefined;
		});
	});

	describe("getRoomByUserId()", function () {
		it("Existing userId", async function () {
			const userId = "user1";
			const expectedRoom = {
				"id": "room0",
				"roomName": "test-unit-1",
				"verificationCode": "abcd"
			};
			const actual = await getRoomByUserId(userId);
			expect(actual).to.be.instanceOf(Room);
			expect(actual).to.deep.equal(expectedRoom);
		});
		it("Absent userId", async function () {
			const userId = "not_a_user";
			const actual = await getRoomByUserId(userId);
			expect(actual).to.be.undefined;
		});
	});

	describe("getAllResidents()", function () {
		it("Test", async function () {
			const expectedLength = 3;
			const expectedResident = {
				"id": "resident0",
				"userId": "user0",
				"roomId": "room0"
			};
			const actual = await getAllResidents();
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
			expect(actual).to.deep.include(expectedResident);
		});
	});

	describe("getResidentByUserId()", function () {
		it("Existing userId", async function () {
			const userId = "user1";
			const expectedResident = {
				"id": "resident1",
				"userId": "user1",
				"roomId": "room0"
			}
			const actual = await getResidentByUserId(userId);
			expect(actual).to.be.instanceOf(Resident);
			expect(actual).to.deep.equal(expectedResident);
		});
		it("Absent userId", async function () {
			const userId = "not_a_user";
			const actual = await getResidentByUserId(userId);
			expect(actual).to.be.undefined;
		});
	});
});