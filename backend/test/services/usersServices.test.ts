import * as chai from "chai";
// import chaiAsPromised from 'chai-as-promised';
import { getExistingUserFromUsername, getExistingUserFromId } from "../../src/services/usersServices.ts";
import { User } from "../../src/dataTypes/user.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";

// chai.use(chaiAsPromised);

const expect = chai.expect;

describe("usersServices", function () {
	before(async function() {
		await loadSampleData();
	});

	describe("getExistingUserFromUsername()", function () {
		it("Existing username", async function () {
			const username = "admin1";
			const expectedUser = {
				"_id": "admin0",
				"username": "admin1",
				"email": "admin1@test.com",
				"phoneNumber": "6045550004",
				"roles": ["Admin"]
			};
			const actual = await getExistingUserFromUsername(username);
			expect(actual).to.deep.equal(expectedUser);
		});
		it("Absent username", async function () {
			const username = "not_a_username";
			const actual = await getExistingUserFromUsername(username);
			expect(actual).to.be.undefined; 
		});
	});

	describe("getExistingUserFromId()", function () {
		it("Existing id", async function () {
			const id = "admin0";
			const expectedUser = {
				"_id": "admin0",
				"username": "admin1",
				"email": "admin1@test.com",
				"phoneNumber": "6045550004",
				"roles": ["Admin"]
			};
			const actual = await getExistingUserFromId(id);
			expect(actual).to.deep.equal(expectedUser);
		});
		it("Absent id", async function () {
			const id = "not_an_id";
			const actual = await getExistingUserFromId(id);
			expect(actual).to.be.undefined;
		});
	});
});