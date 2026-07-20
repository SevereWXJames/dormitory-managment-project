import * as chai from "chai";
// import chaiAsPromised from 'chai-as-promised';
import { getCreditBalanceByUserId, getTransactionHistoryByUserId } from "../../src/services/creditServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {connectMongo} from "../../src/database/database.ts";

// chai.use(chaiAsPromised);

const expect = chai.expect;

describe("creditServices", function () {
	before(async function() {
		this.timeout(15000);
		await connectMongo(true);
		await loadSampleData();
	});

	describe("getCreditBalanceByUserId()", function () {
		it("Existing userId", async function () {
			const userId = "507f191e810c19729de860eb";
			const expectedBalanceCents = 10000;
			const actual = await getCreditBalanceByUserId(userId);
			expect(actual).to.deep.include({balanceCents: expectedBalanceCents});
		});
		it("Absent userId", async function () {
			const userId = "not_a_user";
			const actual = await getCreditBalanceByUserId(userId);
			expect(actual).to.be.undefined;
		});
	});

	describe("getTransactionHistoryByUserId()", function () {
		it("Existing userId", async function () {
			const userId = "507f191e810c19729de860eb";
			const expectedLength = 1;
			const actual = await getTransactionHistoryByUserId(userId);
			expect(actual).to.be.an.instanceOf(Array);
			expect(actual).to.have.lengthOf(expectedLength);
		});
		it("Absent userId", async function () {
			const userId = "not_a_user";
			const actual = await getTransactionHistoryByUserId(userId);
			expect(actual).to.be.an.instanceOf(Array);
			expect(actual).to.be.empty;
		});
	});
});