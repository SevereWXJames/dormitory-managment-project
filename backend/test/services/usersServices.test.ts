import * as chai from "chai";
// import chaiAsPromised from 'chai-as-promised';
import { getExistingUserFromUsername, getExistingUserFromId, getExistingUserFromEmail } from "../../src/services/usersServices.ts";
import loadSampleData from "../../src/database/loadDatabase.ts";
import {connectMongo} from "../../src/database/database.ts";
import {UserModel} from "../../src/dataTypes/user.ts";

// chai.use(chaiAsPromised);

const expect = chai.expect;

describe("usersServices", function () {
	before(async function() {
        try{
            this.timeout(15000);
            await connectMongo();
            await loadSampleData();
        }catch(error){
            throw Error("Error with setup!");
        }
	});

	describe("getExistingUserFromUsername()", function () {
        it('should find all docs', async () => {
            console.log('Querying DB:', UserModel.db.name);
            console.log('UserModel is querying collection:', UserModel.collection.collectionName);
            const all = await UserModel.find({});
            const ids = all.map(doc => doc._id);
            console.log(`ids: ${ids}`);
            console.log('first:', all[0]);
            console.log('all docs:', all); // may run before seeding completes
        });

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
			// expect(actual).to.be.undefined;
            expect(actual).to.be.null;
		});
	});

	describe("getExistingUserFromEmail()", function () {
		it("Existing e-mail", async function () {
			const email = "admin1@test.com";
			const expectedUser = {
				"_id": "admin0",
				"username": "admin1",
				"email": "admin1@test.com",
				"phoneNumber": "6045550004",
				"roles": ["Admin"]
			};
			const actual = await getExistingUserFromEmail(email);
			expect(actual).to.deep.equal(expectedUser);
		});
		it("Absent e-mail", async function () {
			const email = "not_an_email";
			const actual = await getExistingUserFromEmail(email);
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