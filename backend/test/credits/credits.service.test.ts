import * as chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {
    addCredits,
    getCreditBalanceByUserId,
    getTransactionHistoryByUserId
} from "../../src/services/creditServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {after, before} from "mocha";
import {clearTestDB, closeTestDB, connectTestDB} from "../setup/setup.ts";
import {Types} from "mongoose";
import {assert, Should} from "chai";

chai.use(chaiAsPromised);

const expect = chai.expect;

describe("CREDIT SERVICES", function () {

    before(async () => {
        console.log('file loaded');
        await connectTestDB();
    });

    after(async () => {
        await closeTestDB();
    });


    describe("CREDIT SERVICES - GETTING BALANCE, TRANSACTION HISTORY", function () {
        beforeEach(async () => {
            console.log('file loaded');
            await loadSampleData();
            console.log("Loaded sample data");
        });

        afterEach(async () => {
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

    describe("CREDIT SERVICES - ADDING CREDITS", function () {
        beforeEach(async () => {
            console.log('file loaded');
            await loadSampleData();
            console.log("Loaded sample data");
        });

        afterEach(async () => {
            await clearTestDB();
        });

        it("adds credits to user balance successfully", async function () {
            const id = "507f191e810c19729de860eb";
            const userId = new Types.ObjectId(id);
            const amount = 10;
            const expectedBalanceCents = 10000 + amount;
            const expectedLength = 2;
            try{
                await addCredits(userId, amount);
            }catch(error){
                console.log(`Error:  ${error}`);
                assert.fail(`Should not throw error`);
            }

            const balance = await getCreditBalanceByUserId(userId);
            expect(balance).to.deep.include({balanceCents: expectedBalanceCents});

            const transactions = await getTransactionHistoryByUserId(userId);
            expect(transactions).to.be.an.instanceOf(Array);
            expect(transactions).to.have.lengthOf(expectedLength);
        });

        it("attempts to add amount to invalid user, throws error", async function () {
            const id = "ffffffffffffffffffffffff";
            const userId = new Types.ObjectId(id);
            const amount = 10;

            try {
                await expect(addCredits(userId, amount)).to.be.rejectedWith("userId not found.");
                assert.fail("Expected addCredits to throw, but it resolved successfully.");
            } catch (error) {
                assert.ok(error instanceof Error);
            }
        });

        it("throws an error for an invalid user and does not commit any writes", async function () {
            const id = "ffffffffffffffffffffffff";
            const userId = new Types.ObjectId(id);
            const amount = 10;

            await expect(addCredits(userId, amount)).to.eventually.be.rejectedWith("userId not found");

            const balance = await getCreditBalanceByUserId(userId);
            expect(balance).to.be.undefined;

            const transactions = await getTransactionHistoryByUserId(userId);
            expect(transactions).to.be.an.instanceOf(Array);
            expect(transactions).to.have.lengthOf(0);
        });
    });
});