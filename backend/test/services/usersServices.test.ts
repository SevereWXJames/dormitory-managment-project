import * as chai from "chai";
// import chaiAsPromised from 'chai-as-promised';
import { getExistingUserFromUsername, getExistingUserFromId, getExistingUserFromEmail } from "../../src/services/usersServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {connectMongo} from "../../src/database/database.ts";

// chai.use(chaiAsPromised);

const expect = chai.expect;

describe("usersServices", function () {
	before(async function() {
		this.timeout(15000);
		await connectMongo(true);
		await loadSampleData();
	});

	describe("getExistingUserFromUsername()", function () {
		it("Existing username", async function () {
			const username = "admin1";
			const actual = await getExistingUserFromUsername(username);
			expect(actual).to.not.be.undefined;
			expect(actual).to.deep.include({
				username: "admin1",
				email: "admin1@test.com",
				phoneNumber: "6045550004",
				roles: ["Admin"]
			});
		});
		it("Absent username", async function () {
			const username = "not_a_username";
			const actual = await getExistingUserFromUsername(username);
			expect(actual).to.be.undefined; 
		});
	});

	describe("getExistingUserFromEmail()", function () {
		it("Existing e-mail", async function () {
			const email = "admin1@test.com";
			const actual = await getExistingUserFromEmail(email);
			expect(actual).to.not.be.undefined;
			expect(actual).to.deep.include({
				username: "admin1",
				email: "admin1@test.com",
				phoneNumber: "6045550004",
				roles: ["Admin"]
			});
		});
		it("Absent e-mail", async function () {
			const email = "not_an_email";
			const actual = await getExistingUserFromEmail(email);
			expect(actual).to.be.undefined; 
		});
	});

	describe("getExistingUserFromId()", function () {
		it("Existing id", async function () {
			const existingUser = await getExistingUserFromUsername("admin1");
			const id = existingUser ? String((existingUser as { _id?: string })._id) : "507f1f77bcf86cd799439011";
			const actual = await getExistingUserFromId(id);
			expect(actual).to.not.be.undefined;
			expect(actual).to.deep.include({
				username: "admin1",
				email: "admin1@test.com",
				phoneNumber: "6045550004",
				roles: ["Admin"]
			});
		});
		it("Absent id", async function () {
			const id = "507f1f77bcf86cd799439011";
			const actual = await getExistingUserFromId(id);
			expect(actual).to.be.undefined;
		});
	});
});