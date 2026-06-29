import * as chai from "chai";
// import chaiAsPromised from 'chai-as-promised';
import { getReservationsBookedByUserId, getReservationsSlotsByServiceId } from "../../src/services/reservationServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
// chai.use(chaiAsPromised);
const expect = chai.expect;
describe("reservationServices", function () {
    before(async function () {
        await loadSampleData();
    });
    describe("getReservationsBookedByUserId()", function () {
        it("userID with two facilities booked", async function () {
            const userId = "user1";
            const expectedSlot = {
                "id": "slot2",
                "serviceId": "service0",
                "booked": true,
                "bookedBy": "user1",
                "startTime": 7200,
                "durationSeconds": 3600
            };
            const expectedLength = 2;
            const actual = await getReservationsBookedByUserId(userId);
            expect(actual).to.be.instanceOf(Array);
            expect(actual).to.deep.include(expectedSlot);
            expect(actual).to.have.lengthOf(expectedLength);
        });
        it("userID with one facility booked", async function () {
            const userId = "user1";
            const expectedSlot = {
                "id": "slot5",
                "serviceId": "service1",
                "booked": true,
                "bookedBy": "user2",
                "startTime": 7200,
                "durationSeconds": 3600
            };
            const expectedLength = 1;
            const actual = await getReservationsBookedByUserId(userId);
            expect(actual).to.be.instanceOf(Array);
            expect(actual).to.deep.include(expectedSlot);
            expect(actual).to.have.lengthOf(expectedLength);
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
            const expectedSlotBooked = {
                "id": "slot5",
                "serviceId": "service1",
                "booked": true,
                "bookedBy": "user2",
                "startTime": 7200,
                "durationSeconds": 3600
            };
            const expectedSlotNotBooked = {
                "id": "slot3",
                "serviceId": "service1",
                "booked": false,
                "startTime": 0,
                "durationSeconds": 3600
            };
            const expectedLength = 3;
            const actual = await getReservationsSlotsByServiceId(serviceId);
            expect(actual).to.be.instanceOf(Array);
            expect(actual).to.deep.include(expectedSlotBooked);
            expect(actual).to.deep.include(expectedSlotNotBooked);
            expect(actual).to.have.lengthOf(expectedLength);
        });
    });
});
//# sourceMappingURL=reservationServices.test.js.map