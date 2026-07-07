import * as chai from "chai";
// import chaiAsPromised from 'chai-as-promised';
import { getAllServices, getServiceById } from "../../src/services/serviceServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {connectMongo} from "../../src/database/database.ts";

// chai.use(chaiAsPromised);

const expect = chai.expect;

describe("serviceServices", function () {
	before(async function() {
		this.timeout(15000);
		await connectMongo(true);
		await loadSampleData();
	});

	describe("getAllServices()", function () {
		it("Test", async function () {
			const expectedLength = 3;
			const actual = await getAllServices();
			expect(actual).to.be.an.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
			expect(actual.some((service) => service.name === "Washing Machine 2" && service.description === "test" && service.hasIoT === true && service.IoTName === "WashingMachineType1" && service.reservationDurationSeconds === 3600 && service.reservationStartHour === 8 && service.reservationEndHour === 18)).to.be.true;
		});
	});

	describe("getServiceById()", function () {
		it("Existing id with hasIoT: false", async function () {
			const allServices = await getAllServices();
			const target = allServices.find((service) => service.name === "Dryer 1");
			const actual = target ? await getServiceById(String(target._id)) : undefined;
			expect(actual).to.not.be.undefined;
			expect(actual).to.deep.include({
				name: "Dryer 1",
				description: "test",
				hasIoT: false,
				reservationDurationSeconds: 3600,
				reservationStartHour: 8,
				reservationEndHour: 18
			});
		});
		it("Existing id with hasIoT: true", async function () {
			const allServices = await getAllServices();
			const target = allServices.find((service) => service.name === "Washing Machine 2");
			const actual = target ? await getServiceById(String(target._id)) : undefined;
			expect(actual).to.not.be.undefined;
			expect(actual).to.deep.include({
				name: "Washing Machine 2",
				description: "test",
				hasIoT: true,
				IoTName: "WashingMachineType1",
				reservationDurationSeconds: 3600,
				reservationStartHour: 8,
				reservationEndHour: 18
			});
		});
		it("Absent id", async function () {
			const id = "507f1f77bcf86cd799439011";
			const actual = await getServiceById(id);
			expect(actual).to.be.undefined;
		});
	});

});