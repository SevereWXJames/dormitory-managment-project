import * as chai from "chai";
// import chaiAsPromised from 'chai-as-promised';
import { getCreditBalanceByUserId, getTransactionHistoryByUserId } from "../../src/services/creditServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";

// chai.use(chaiAsPromised);

const expect = chai.expect;

describe("creditServices", function () {
	before(async function() {
		await loadSampleData();
	});

	describe("getCreditBalanceByUserId()", function () {
		it("Existing userId", async function () {
			const userId = "user1";
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
			const userId = "user1";
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