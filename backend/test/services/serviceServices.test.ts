import * as chai from "chai";
// import chaiAsPromised from 'chai-as-promised';
import { getAllServices, getServiceById } from "../../src/services/serviceServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {connectMongo} from "../../src/database/database.ts";
import mongoose from "mongoose";
const expect = chai.expect;

describe("serviceServices", function () {
    before(async function() {
        this.timeout(15000);
        await connectMongo();
        await loadSampleData();
    });

    describe("getAllServices()", function () {
        it("Test", async function () {
            const expectedLength = 3;
            const expectedService = {
                _id: "6a52f45de9f73aca080caf85",
                name: "Washing Machine 1",
                description: "test",
                hasIoT: true,
                IoTUUID: "1586d8a9-3559-42ee-a7ed-36ee249506bb",
                IoTType: "washingMachine",
                reservationDurationSeconds: 3600,
                reservationStartHour: 8,
                reservationEndHour: 18
            };
            const actual = await getAllServices();
            const clean = actual.map(service => {
                let cleanService = service as any;
                cleanService._id = cleanService._id.toString();
                return cleanService;
            });
            console.log(JSON.stringify(clean));
            expect(actual).to.be.instanceOf(Array);
            expect(actual).to.have.lengthOf(expectedLength);
            expect(clean).to.deep.include(expectedService);
        });
    });

    describe("getServiceById()", function () {
        it("Existing id", async function () {
            const id = new mongoose.Types.ObjectId("6a52f45de9f73aca080caf86");
            const expectedService = {
                _id: "6a52f45de9f73aca080caf86",
                name: "Washing Machine 2",
                description: "test",
                hasIoT: true,
                IoTUUID: "1586d8a9-3559-42ee-a7ed-36ee249506bc",
                IoTType: "washingMachine",
                reservationDurationSeconds: 3600,
                reservationStartHour: 8,
                reservationEndHour: 18
            };
            const actual = await getServiceById(id);
            expect(actual).to.not.be.undefined;
            let cleanService = actual as any;
            cleanService._id = cleanService._id.toString();
            expect(cleanService).to.deep.equal(expectedService);
        });
        it("Absent id", async function () {
            const id = new mongoose.Types.ObjectId("0002f45de9f73aca080caf86");
            const actual = await  getServiceById(id);
            expect(actual).to.be.undefined;
        });
    });

});