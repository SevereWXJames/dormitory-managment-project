import * as chai from "chai";
import {getReservationsBookedByUserId, getReservationsSlotsByServiceId, handleSlotUpdates}
	from "../../src/services/reservationServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {connectMongo} from "../../src/database/database.ts";
import mongoose from "mongoose";

const expect = chai.expect;

describe("reservationServices", function () {
	before(async function() {
		this.timeout(15000);
		await connectMongo(true);
		await loadSampleData();
		await handleSlotUpdates();
	});

	describe("getReservationsBookedByUserId()", function () {
		it("newly generated slots should not be booked", async function () {
			const userId = new mongoose.Types.ObjectId("507f191e810c19729de860eb");
			const actual = await getReservationsBookedByUserId(userId);
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.be.empty;
		});
	});

	describe("getReservationsSlotsByServiceId()", function () {
		it("Services should start with the correct amount of slots", async function () {
			const serviceId = new mongoose.Types.ObjectId("6a52f45de9f73aca080caf86");
			const expectedLength = 70;
			const actual = await getReservationsSlotsByServiceId(serviceId);
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
		})
	});
});