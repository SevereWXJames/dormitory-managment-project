import * as chai from "chai";
// import chaiAsPromised from 'chai-as-promised';
import { getAllServices, getServiceById } from "../../src/services/serviceServices.ts";
import { Service } from "../../src/dataTypes/service.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";

// chai.use(chaiAsPromised);

const expect = chai.expect;

describe("serviceServices", function () {
	before(async function() {
		await loadSampleData();
	});

	describe("getAllServices()", function () {
		it("Test", async function () {
			const expectedLength = 3;
			const expectedService = {
				"_id": "service1",
				"name": "Washing Machine 2",
				"description": "test",
				"hasIoT": true,
				"IoTName": "WashingMachineType1",
				"reservationDurationSeconds": 3600,
				"reservationStartHour": 8,
				"reservationEndHour": 18
			};
			const actual = await getAllServices();
			expect(actual).to.be.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
			expect(actual).to.deep.include(expectedService);
		});
	});

	describe("getServiceById()", function () {
		it("Existing id with hasIoT: false", async function () {
			const id = "service2";
			const expectedService = {
				"_id": "service2",
				"name": "Dryer 1",
				"description": "test",
				"hasIoT": false,
				"reservationDurationSeconds": 3600,
				"reservationStartHour": 8,
				"reservationEndHour": 18
			};
			const actual = await getServiceById(id);
			expect(actual).to.deep.equal(expectedService);
		});
		it("Existing id with hasIoT: true", async function () {
			const id = "service1";
			const expectedService = {
				"_id": "service1",
				"name": "Washing Machine 2",
				"description": "test",
				"hasIoT": true,
				"IoTName": "WashingMachineType1",
				"reservationDurationSeconds": 3600,
				"reservationStartHour": 8,
				"reservationEndHour": 18
			};
			const actual = await getServiceById(id);
			expect(actual).to.deep.equal(expectedService);
		});
		it("Absent id", async function () {
			const id = "not_a_service";
			const actual = await  getServiceById(id);
			expect(actual).to.be.undefined;
		});
	});

});