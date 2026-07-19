import * as chai from "chai";
import { getReservationsBookedByUserId, getReservationsSlotsByServiceId }
	from "../../src/services/reservationServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {connectMongo} from "../../src/database/database.ts";

const expect = chai.expect;

describe("reservationServices", function () {
	before(async function() {
		this.timeout(15000);
		await connectMongo(true);
		await loadSampleData();
	});

	describe("getReservationsBookedByUserId()", function () {
		it("userID with two facilities booked", async function () {
			const userId = "user1";
			const expectedLength = 2;
			const actual = await getReservationsBookedByUserId(userId);
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
			expect(actual.some((slot) => slot.serviceId === "service0" && slot.booked === true && slot.bookedBy === "user1" && slot.startTime === 7200 && slot.durationSeconds === 3600)).to.be.true;
		});
		it("userID with one facility booked", async function () {
			const userId = "user2";
			const expectedLength = 1;
			const actual = await getReservationsBookedByUserId(userId);
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
			expect(actual.some((slot) => slot.serviceId === "service1" && slot.booked === true && slot.bookedBy === "user2" && slot.startTime === 7200 && slot.durationSeconds === 3600)).to.be.true;
		});
		it("Absent userId", async function () {
			const userId = "not_a_user";
			const actual = await getReservationsBookedByUserId(userId);
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.be.empty;
		});
	});

	describe("getReservationsSlotsByServiceId()", function () {
		it("Service with both booked and not booked slots", async function () {
			const serviceId = "service1";
			const expectedLength = 3;
			const actual = await getReservationsSlotsByServiceId(serviceId);
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
			expect(actual.some((slot) => slot.serviceId === "service1" && slot.booked === true && slot.bookedBy === "user2" && slot.startTime === 7200 && slot.durationSeconds === 3600)).to.be.true;
			expect(actual.some((slot) => slot.serviceId === "service1" && slot.booked === false && slot.startTime === 0 && slot.durationSeconds === 3600)).to.be.true;
		})
	});
});