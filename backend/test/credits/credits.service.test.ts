import * as chai from "chai";
import { getCreditBalanceByUserId, getTransactionHistoryByUserId } from "../../src/services/creditServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {after, before} from "mocha";
import {clearTestDB, connectTestDB} from "../setup/setup.ts";
import {Types} from "mongoose";

const expect = chai.expect;

describe("CREDIT SERVICES", function () {
    before(async () => {
        console.log('file loaded');
        await connectTestDB();
        await loadSampleData();
        console.log("Loaded sample data");
    });

    after(async () => {
        await clearTestDB();
    });

    describe("getCreditBalanceByUserId()", function () {
        it("Existing userId", async function () {
            const id = "507f191e810c19729de860eb";
            const userId = new Types.ObjectId(id);
            const expectedBalanceCents = 10000;
            const actual = await getCreditBalanceByUserId(userId);
            expect(actual).to.deep.include({balanceCents: expectedBalanceCents});
        });

        it("Absent userId", async function () {
            const id = "ffffffffffffffffffffffff";
            const userId = new Types.ObjectId(id);
            const actual = await getCreditBalanceByUserId(userId);
            expect(actual).to.be.undefined;
        });
    });

    describe("getTransactionHistoryByUserId()", function () {
        it("Existing userId", async function () {
            const id = "507f191e810c19729de860eb";
            const userId = new Types.ObjectId(id);
            const expectedLength = 1;
            const actual = await getTransactionHistoryByUserId(userId);
            expect(actual).to.be.an.instanceOf(Array);
            expect(actual).to.have.lengthOf(expectedLength);
        });

        it("Absent userId", async function () {
            const id = "ffffffffffffffffffffffff";
            const userId = new Types.ObjectId(id);
            const actual = await getTransactionHistoryByUserId(userId);
            expect(actual).to.be.an.instanceOf(Array);
            expect(actual).to.be.empty;
        });
    });
});