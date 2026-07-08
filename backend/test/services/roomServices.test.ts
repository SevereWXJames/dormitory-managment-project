import * as chai from "chai";
import chaiAsPromised from 'chai-as-promised';
import { getAllRooms, getRoomById, getRoomByUserId, getAllResidents, getResidentByUserId }
	from "../../src/services/roomServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {connectMongo} from "../../src/database/database.ts";

chai.use(chaiAsPromised);

const expect = chai.expect;

describe("roomServices", function () {
	before(async function() {
		this.timeout(15000);
		await connectMongo(true);
		await loadSampleData();
	});

	describe("getAllRooms()", function () {
		it("Test", async function () {
			const expectedLength = 3;
			const actual = await getAllRooms();
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
			expect(actual.some((room) => room.roomName === "test-unit-2" && room.verificationCode === "abcd")).to.be.true;
		});
	});

	describe("getRoomById()", function () {
		it("Existing id", async function () {
			const allRooms = await getAllRooms();
			const target = allRooms.find((room) => room.roomName === "test-unit-1");
			const actual = target ? await getRoomById(String(target._id)) : undefined;
			expect(actual).to.not.be.undefined;
			expect(actual).to.deep.include({
				roomName: "test-unit-1",
				verificationCode: "abcd"
			});
		});
		it("Absent id", async function () {
			const id = "507f1f77bcf86cd799439099";
			const actual = await getRoomById(id);
			expect(actual).to.be.undefined;
		});
	});

	describe("getRoomByUserId()", function () {
		it("Existing userId", async function () {
			const userId = "user1";
			const actual = await getRoomByUserId(userId);
			expect(actual).to.not.be.undefined;
			expect(actual).to.deep.include({
				roomName: "test-unit-1",
				verificationCode: "abcd"
			});
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
			const actual = await getAllResidents();
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
			expect(actual.some((resident) => resident.userId === "user0" && resident.roomId === "507f1f77bcf86cd799439011")).to.be.true;
		});
	});

	describe("getResidentByUserId()", function () {
		it("Existing userId", async function () {
			const userId = "user1";
			const actual = await getResidentByUserId(userId);
			expect(actual).to.not.be.undefined;
			expect(actual).to.include({
				userId: "user1",
				roomId: "507f1f77bcf86cd799439011"
			});
		});
		it("Absent userId", async function () {
			const userId = "not_a_user";
			const actual = await getResidentByUserId(userId);
			expect(actual).to.be.undefined;
		});
	});
});